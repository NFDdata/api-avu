import { ValidateService } from './../validate/validate.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserStatus } from '../users/schema/user.schema';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { cleanRut } from 'src/helpers/rut.helper';
import * as bcryptjs from 'bcryptjs';
import { Login } from '../users/dto/login.dto';
import { Token } from './token.model';
import { cleanUserModel } from '../helpers/cleanUserModel';
import { DOCUMENT_TYPE } from '../constants';
import axios from 'axios';

export interface confirmResponse {
  message: string;
  status: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly validateService: ValidateService
  ) {}

  async session(id: string): Promise<User> {
    return this.userService.findById(id);
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    // agregar lógica de creación duplicada cuando se definan todos las filas de cada tabla de la BD
    const documentNumber = cleanRut(createUserDto.documentNumber);

    if (
      documentNumber &&
      (await this.userService.findByDocumentsNumbers([documentNumber])).length >
        0
    )
      throw new BadRequestException('userExists');

    const allowedValues = Object.values(DOCUMENT_TYPE);
    if (!allowedValues.includes(createUserDto.documentType))
      throw new BadRequestException('documentTypeNotAllowed');

    if (await this.userService.findByEmail(createUserDto.email))
      throw new BadRequestException('userExists');

    const password = await bcryptjs.hash(createUserDto.password, 10);
    const activateAccountToken = this.jwt.sign(
      { email: createUserDto.email },
      {
        expiresIn: '2 days'
      }
    );

    createUserDto.documentNumber = createUserDto.documentNumber
      ?.split('.')
      ?.join('')
      ?.split('-')
      ?.join('');

    const user = await this.userService.create({
      ...createUserDto,
      password,
      activateAccountToken
    });

    if (user)
      await axios.post(
        `${process.env.API_EMAIL_ENDPOINT}`,
        {
          subject: 'activate account token',
          plainText: `please follow the next link for activate account ${process.env.WEB_URL}/verify/${activateAccountToken}`,
          address: user.email
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        }
      );

    return user;
  }

  async validateUser(login: Login): Promise<User | string> {
    return await this.userService.validate(login);
  }

  async login(user: User): Promise<Token> {
    const payload = {
      sub: user._id,
      user: cleanUserModel(user)
    };

    return {
      accessToken: this.jwt.sign(payload)
    };
  }

  async confirmAccount(token: string): Promise<confirmResponse> {
    this.jwt.verify(token);

    const decodeToken = this.jwt.decode(token);

    const { email } = decodeToken as Record<string, string>;

    const user = await this.userService.findByEmail(email);

    if (!user) return { message: 'notUserFound', status: false };

    if (
      user.status !== UserStatus.PENDING_VALIDATE ||
      user.activateAccountToken !== token
    )
      return { message: 'failConfirmAccount', status: false };

    user.status = UserStatus.ACTIVE;
    user.activateAccountToken = null;

    const userId = user._id as unknown as string;

    await this.userService.update(userId, user);

    await this.validateService.create(user);

    return { message: 'confirmedAccount', status: true };
  }
}
