import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { JwtService } from '@nestjs/jwt';
import { Login } from './dto/login.dto';
export declare class UserService {
    private readonly userModel;
    private readonly jwt;
    constructor(userModel: ReturnModelType<typeof User>, jwt: JwtService);
    findAll(): Promise<User[]>;
    create(user: CreateUserDto): Promise<User>;
    findOneBy<T>(query: T): Promise<DocumentType<User>>;
    findByDocumentsNumbers(documentNumbers: string[]): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    delete(_id: string): Promise<User>;
    validate(input: Login): Promise<User | string>;
}
