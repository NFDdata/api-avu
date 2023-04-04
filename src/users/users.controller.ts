import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Request() req): Promise<User> {
    console.log('users', req.body);
    return await this.userService.create(req.body);
  }
}
