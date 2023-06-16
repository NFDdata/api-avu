import { DynamicModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ValidateModule } from './validate/validate.module';

export const AppImports = (
  env: NodeJS.ProcessEnv
): (DynamicModule | typeof UsersModule)[] => {
  return [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }.env`
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: env.MONGODB,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    TerminusModule,
    UsersModule,
    AuthModule,
    HealthModule,
    ValidateModule
  ];
};
