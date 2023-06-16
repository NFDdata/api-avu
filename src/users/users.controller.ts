import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './users.service';
import { bodyDelete } from './dto/deleteUser.dto';
import { User } from './schema/user.schema';
import { ApiResponse } from '../helpers/metadata.model';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Res() res: Response): Promise<Response<ApiResponse<User[]>>> {
    try {
      const users = await this.userService.findAll();

      return res
        .status(200)
        .json({ status: 200, message: 'success', data: users })
        .send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, message: 'fail', error: error.response })
        .send();
    }
  }

  @Get('find')
  @HttpCode(HttpStatus.OK)
  async findOneBy(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<ApiResponse<User>>> {
    try {
      const findUsers = await this.userService.findOneBy(req.query);

      if (!findUsers)
        throw new HttpException('Not Found Users', HttpStatus.NOT_FOUND);

      return res
        .status(200)
        .json({ status: 200, message: 'success', data: findUsers })
        .send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, message: 'fail', error: error.response })
        .send();
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<ApiResponse<User>>> {
    try {
      const createdUser = await this.userService.create(req.body);

      const response: ApiResponse<User> = {
        status: 200,
        message: 'success',
        data: createdUser
      };

      return res.status(200).json(response).send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, message: 'fail', error: error.response })
        .send();
    }
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<ApiResponse<User>>> {
    try {
      const id = req.query.id as string;
      const updatedUser = await this.userService.update(id, req.body);

      const response: ApiResponse<User> = {
        status: 200,
        message: 'success',
        data: updatedUser
      };
      // console.log('dime que viene', req.query.id, 'y aqui', req.body);

      return res.status(200).json(response).send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, message: 'fail', error: error.response.message })
        .send();
    }
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body() body: bodyDelete,
    @Res() res: Response
  ): Promise<Response<ApiResponse<User>>> {
    try {
      const deletedUser = await this.userService.delete(body.id);

      return res
        .status(200)
        .json({ status: 200, message: 'success', data: deletedUser })
        .send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, message: 'fail', error: error.response })
        .send();
    }
  }
}
