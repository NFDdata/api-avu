"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppImports = void 0;
const schedule_1 = require("@nestjs/schedule");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const terminus_1 = require("@nestjs/terminus");
const health_module_1 = require("./health/health.module");
const AppImports = (env) => {
    return [
        schedule_1.ScheduleModule.forRoot(),
        config_1.ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}.env`
        }),
        nestjs_typegoose_1.TypegooseModule.forRootAsync({
            imports: [config_1.ConfigModule],
            useFactory: async () => ({
                uri: env.MONGODB,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }),
            inject: [config_1.ConfigService]
        }),
        terminus_1.TerminusModule,
        users_module_1.UsersModule,
        health_module_1.HealthModule
    ];
};
exports.AppImports = AppImports;
//# sourceMappingURL=app.imports.js.map