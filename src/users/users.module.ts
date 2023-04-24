import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    // import MongoDB with typegoose
    TypegooseModule.forFeature([
      { typegooseClass: User, schemaOptions: { timestamps: true } }
    ]),
    ConfigModule, // config module according to nestjs

    PassportModule.register({ defaultStrategy: 'jwt' }),

    // passport config
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', process.env.JWT_SECRET),
        signOptions: {
          expiresIn: 3600
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}
