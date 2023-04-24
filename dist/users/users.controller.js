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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll(res) {
        try {
            const users = await this.userService.findAll();
            return res
                .status(200)
                .json({ status: 200, message: 'all users', users })
                .send();
        }
        catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ status: 500, error: error.response })
                .send();
        }
    }
    async findOneBy(req, res) {
        try {
            const findUsers = await this.userService.findOneBy(req.query);
            if (!findUsers)
                throw new common_1.HttpException('Not Found Users', common_1.HttpStatus.NOT_FOUND);
            return res
                .status(200)
                .json({ status: 200, message: 'find user(s)', findUsers })
                .send();
        }
        catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ status: 500, error: error.response })
                .send();
        }
    }
    async create(req, res) {
        try {
            const createdUser = await this.userService.create(req.body);
            return res
                .status(200)
                .json({ status: 200, message: 'created user', createdUser })
                .send();
        }
        catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ status: 500, error: error.response })
                .send();
        }
    }
    async delete(body, res) {
        try {
            const deletedUser = await this.userService.delete(body.id);
            return res
                .status(200)
                .json({ status: 200, message: 'deleted user', deletedUser })
                .send();
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, error }).send();
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('find'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneBy", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map