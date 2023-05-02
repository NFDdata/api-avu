import { Request, Response } from 'express';
import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(req: Request, res: Response): Promise<Response>;
}
