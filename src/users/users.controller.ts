import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { User } from './schema/user.schema';
import { UserService } from './users.service';
import { DocumentType } from '@typegoose/typegoose';
import { bodyDelete } from './dto/deleteUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('find')
  async findOneBy(@Request() req: RequestType): Promise<DocumentType<User>> {
    return await this.userService.findOneBy(req.query);
  }

  @Post()
  async create(@Request() req: RequestType): Promise<User> {
    return await this.userService.create(req.body);
  }

  @Delete()
  async delete(@Body() body: bodyDelete): Promise<User> {
    return await this.userService.delete(body.id);
  }
}
