import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
// import { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    // private http: HttpHealthIndicator,
    private mongoose: MongooseHealthIndicator,
  ) {}

  @Get('db')
  @HealthCheck()
  checkDB() {
    return this.health.check([
      async () => this.mongoose.pingCheck('ZeroCompanyMongoDB'),
    ]);
  }

  @Get('about')
  about() {
    return {
      title: process.env.TITLE,
      version: process.env.VERSION,
      description: process.env.DESCRIPTION,
    };
  }
}
