import { Request as RequestType } from 'express';
import { User } from './schema/user.schema';
import { UserService } from './users.service';
import { DocumentType } from '@typegoose/typegoose';
import { bodyDelete } from './dto/deleteUser.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOneBy(req: RequestType): Promise<DocumentType<User>>;
    create(req: RequestType): Promise<User>;
    delete(body: bodyDelete): Promise<User>;
}
