/// <reference types="mongoose/types/models" />
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    create(user: CreateUserDto): Promise<User>;
}
