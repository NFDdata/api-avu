import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { Login } from '../users/dto/login.dto';
import { Token } from './token.model';
export declare class AuthService {
    private readonly userService;
    private readonly jwt;
    constructor(userService: UserService, jwt: JwtService);
    session(id: string): Promise<User>;
    signUp(createUserDto: CreateUserDto): Promise<User>;
    validateUser(login: Login): Promise<User | string>;
    login(user: User): Promise<Token>;
}
