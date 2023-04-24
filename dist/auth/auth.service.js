"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const rut_helper_1 = require("../helpers/rut.helper");
const bcryptjs = require("bcryptjs");
const cleanUserModel_1 = require("../helpers/cleanUserModel");
let AuthService = class AuthService {
    constructor(userService, jwt) {
        this.userService = userService;
        this.jwt = jwt;
    }
    async session(id) {
        return this.userService.findById(id);
    }
    async signUp(createUserDto) {
        var _a, _b, _c, _d;
        const documentNumber = (0, rut_helper_1.cleanRut)(createUserDto.documentNumber);
        if (documentNumber &&
            (await this.userService.findByDocumentsNumbers([documentNumber])).length >
                0)
            throw new common_1.BadRequestException('userExists');
        if (await this.userService.findByEmail(createUserDto.email))
            throw new common_1.BadRequestException('userExists');
        const password = await bcryptjs.hash(createUserDto.password, 10);
        createUserDto.documentNumber = (_d = (_c = (_b = (_a = createUserDto.documentNumber) === null || _a === void 0 ? void 0 : _a.split('.')) === null || _b === void 0 ? void 0 : _b.join('')) === null || _c === void 0 ? void 0 : _c.split('-')) === null || _d === void 0 ? void 0 : _d.join('');
        const user = await this.userService.create(Object.assign(Object.assign({}, createUserDto), { password }));
        return user;
    }
    async validateUser(login) {
        return await this.userService.validate(login);
    }
    async login(user) {
        const payload = {
            sub: user._id,
            user: (0, cleanUserModel_1.cleanUserModel)(user)
        };
        return {
            accessToken: this.jwt.sign(payload)
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map