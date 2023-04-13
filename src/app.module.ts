import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AppImports } from './app.imports';

@Module({
  imports: [...AppImports(process.env)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
