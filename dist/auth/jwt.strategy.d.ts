import { ConfigService } from '@nestjs/config';
import { Payload, UserPayload } from './interfaces/payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly config;
    constructor(config: ConfigService);
    validate(payload: Payload): UserPayload;
}
export {};
