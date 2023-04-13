import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
