import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './users.service';
import { bodyDelete } from './dto/deleteUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const users = await this.userService.findAll();

      return res
        .status(200)
        .json({ status: 200, message: 'all users', users })
        .send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, error: error.response })
        .send();
    }
  }

  @Get('find')
  @HttpCode(HttpStatus.OK)
  async findOneBy(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const findUsers = await this.userService.findOneBy(req.query);

      if (!findUsers)
        throw new HttpException('Not Found Users', HttpStatus.NOT_FOUND);

      return res
        .status(200)
        .json({ status: 200, message: 'find user(s)', findUsers })
        .send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, error: error.response })
        .send();
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const createdUser = await this.userService.create(req.body);

      return res
        .status(200)
        .json({ status: 200, message: 'created user', createdUser })
        .send();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ status: 500, error: error.response })
        .send();
    }
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body() body: bodyDelete,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const deletedUser = await this.userService.delete(body.id);

      return res
        .status(200)
        .json({ status: 200, message: 'deleted user', deletedUser })
        .send();
    } catch (error) {
      console.error(error);

      return res.status(500).json({ status: 500, error }).send();
    }
  }
}
