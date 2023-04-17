import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: ReturnModelType<typeof User>);
    findAll(): Promise<User[]>;
    create(user: CreateUserDto): Promise<User>;
    findOneBy<T>(query: T): Promise<DocumentType<User>>;
    delete(_id: string): Promise<User>;
}
