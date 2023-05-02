import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendEmail(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const email = await this.emailService.sendEmail(req.body);

      return res
        .status(200)
        .json({ status: 200, message: 'all users', email: email.result_code })
        .send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, error: error.response })
        .send();
    }
  }
}
