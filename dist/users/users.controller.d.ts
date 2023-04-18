import { Request, Response } from 'express';
import { UserService } from './users.service';
import { bodyDelete } from './dto/deleteUser.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(res: Response): Promise<Response>;
    findOneBy(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    delete(body: bodyDelete, res: Response): Promise<Response>;
}
