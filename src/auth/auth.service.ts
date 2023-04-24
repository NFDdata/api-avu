import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { cleanRut } from 'src/helpers/rut.helper';
import * as bcryptjs from 'bcryptjs';
import { Login } from '../users/dto/login.dto';
import { Token } from './token.model';
import { cleanUserModel } from '../helpers/cleanUserModel';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService
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

    if (await this.userService.findByEmail(createUserDto.email))
      throw new BadRequestException('userExists');

    const password = await bcryptjs.hash(createUserDto.password, 10);

    createUserDto.documentNumber = createUserDto.documentNumber
      ?.split('.')
      ?.join('')
      ?.split('-')
      ?.join('');

    const user = await this.userService.create({ ...createUserDto, password });

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
}
