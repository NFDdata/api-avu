import { Controller, Get } from '@nestjs/common';

import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator
  ) {}

  @Get('db')
  @HealthCheck()
  checkDB() {
    return this.health.check([
      async () => this.mongoose.pingCheck('ZeroCompanyMongoDB')
    ]);
  }

  @Get('about')
  about() {
    return {
      title: process.env.TITLE,
      version: process.env.VERSION,
      description: process.env.DESCRIPTION
    };
  }
}
