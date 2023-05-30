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
import { ApiResponse } from '../helpers/metadata.model';
import { User } from '../users/schema/user.schema';

export class Session {
  id: string;
  email: string;
  accessToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('/signUp')
  @HttpCode(HttpStatus.OK)
  async register(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<ApiResponse<User[]>>> {
    try {
      const user = await this.authService.signUp(req.body);

      if (!user)
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

      return res
        .status(200)
        .json({ status: 200, message: 'success', data: user })
        .send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, message: 'fail', error: error.response })
        .send();
    }
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<ApiResponse<Session>>> {
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

      return res
        .status(200)
        .json({ status: 200, message: 'success', data: session })
        .send();
    } catch (error) {
      return res
        .status(401)
        .json({ status: 500, message: 'fail', error: error.response })
        .send();
    }
  }
}
