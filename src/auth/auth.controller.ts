import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('/signUp')
  @HttpCode(HttpStatus.OK)
  async register(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const user = await this.authService.signUp(req.body);

      if (!user)
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

      return res.status(200).json(user).send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, error: error.response })
        .send();
    }
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.authService.validateUser(req.body);

      if (typeof user === 'string')
        throw new HttpException(user, HttpStatus.UNAUTHORIZED);

      const token = await this.authService.login(user);

      const session = {
        id: user._id as string,
        email: user.email,
        accessToken: token.accessToken
      };

      return res.status(200).json(session).send();
    } catch (error) {
      return res.status(401).json({ error: error.response }).send();
    }
  }
}
