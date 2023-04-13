import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { User } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: User, schemaOptions: { timestamps: true } }
    ]),
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}
