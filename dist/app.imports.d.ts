import { DynamicModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
export declare const AppImports: (env: NodeJS.ProcessEnv) => (DynamicModule | typeof UsersModule)[];
