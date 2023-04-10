import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private mongoose;
    constructor(health: HealthCheckService, mongoose: MongooseHealthIndicator);
    checkDB(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    about(): {
        title: string;
        version: string;
        description: string;
    };
}
