import { User } from './schema/user.schema';
import { UserService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    create(req: any): Promise<User>;
}
