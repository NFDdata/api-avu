"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfiguration = void 0;
const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3001,
    defaultLimit: process.env.DEFAULT_LIMIT || 10,
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'TH151SMYJWT53CR3TK3Y155054F34ND33CUR3'
});
exports.EnvConfiguration = EnvConfiguration;
//# sourceMappingURL=app.config.js.map