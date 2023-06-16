import { User } from './../users/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Validate } from './schema/validate.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ValidateService {
  constructor(
    @InjectModel(Validate)
    private readonly validateModel: ReturnModelType<typeof Validate>
  ) {}

  async create(user: User): Promise<Validate> {
    const { _id, name } = user;

    const createParams = {
      user: _id,
      name
    };

    return this.validateModel.create(createParams);
  }
}
