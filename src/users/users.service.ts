import { Injectable } from '@nestjs/common';

import { User, UserStatus } from './schema/user.schema';
import { CreateUserDto, UpdateUserInput } from './dto/createUser.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { JwtService } from '@nestjs/jwt';
import { Login } from './dto/login.dto';
import { UserLoginStatus } from '../constants';
import * as bcryptjs from 'bcryptjs';
import { cleanUserModel } from '../helpers/cleanUserModel';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwt: JwtService
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    return users;
  }

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user).save();

    return createdUser;
  }

  async findOneBy<T>(query: T): Promise<User> {
    const findUser = await this.userModel.findOne(query);

    return findUser;
  }

  async findByDocumentsNumbers(documentNumbers: string[]): Promise<User[]> {
    return this.userModel.find({ documentNumber: { $in: documentNumbers } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async delete(_id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(_id);
  }

  async update(id: string, user: UpdateUserInput): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async validate(input: Login): Promise<User | string> {
    const { email, password } = input;

    const user: User = await this.userModel.findOne({ email });

    if (!user) return UserLoginStatus.USER_BLOCKED;

    if (user.status === UserStatus.PENDING_VALIDATE)
      return UserLoginStatus.PENDING_CONFIRMATION;

    const valid = await bcryptjs.compare(password, user.password);

    let returnMessage = '';

    if (!valid) returnMessage = UserLoginStatus.WRONG_CREDENTIALS;

    return valid ? cleanUserModel(user) : returnMessage;
  }
}
