import { Injectable } from '@nestjs/common';

import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user).save();

    return createdUser;
  }

  async findOneBy<T>(query: T): Promise<DocumentType<User>> {
    const findUser = await this.userModel.findOne(query);
    return findUser;
  }

  async delete(_id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(_id);
  }
}
