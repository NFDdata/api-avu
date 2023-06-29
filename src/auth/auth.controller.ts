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
import { User, UserStatus } from '../users/schema/user.schema';
import { DOCUMENT_TYPE } from '../constants';

export class Session {
  id: string;
  email: string;
  accessToken: string;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  documentNumber: string;
  documentType: DOCUMENT_TYPE;
  state: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  status: UserStatus;
  activateAccountToken?: string;
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
        ...user,
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

  @Post('/confirmAccount')
  @HttpCode(HttpStatus.OK)
  async confirmAccount(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<ApiResponse<Session>>> {
    try {
      const confirmAccount = await this.authService.confirmAccount(
        req.body.token
      );

      if (!confirmAccount.status)
        throw new HttpException(
          confirmAccount.message,
          HttpStatus.UNAUTHORIZED
        );

      return res
        .status(200)
        .json({
          status: 200,
          message: confirmAccount.message,
          data: confirmAccount.status
        })
        .send();
    } catch (error) {
      return res
        .status(401)
        .json({ status: 500, message: 'fail', error: error.response })
        .send();
    }
  }
}
