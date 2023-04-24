import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(req: Request, res: Response): Promise<Response>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
