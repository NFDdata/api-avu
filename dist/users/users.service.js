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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./schema/user.schema");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
const bcryptjs = require("bcryptjs");
let UserService = class UserService {
    constructor(userModel, jwt) {
        this.userModel = userModel;
        this.jwt = jwt;
    }
    async findAll() {
        const users = await this.userModel.find().exec();
        return users;
    }
    async create(user) {
        const createdUser = new this.userModel(user).save();
        return createdUser;
    }
    async findOneBy(query) {
        const findUser = await this.userModel.findOne(query);
        return findUser;
    }
    async findByDocumentsNumbers(documentNumbers) {
        return this.userModel.find({ documentNumber: { $in: documentNumbers } });
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async delete(_id) {
        return this.userModel.findByIdAndRemove(_id);
    }
    async validate(input) {
        const { email, password } = input;
        const user = await this.userModel.findOne({ email });
        if (!user)
            return constants_1.UserLoginStatus.USER_BLOCKED;
        const valid = await bcryptjs.compare(password, user.password);
        let returnMessage = '';
        if (!valid)
            returnMessage = constants_1.UserLoginStatus.WRONG_CREDENTIALS;
        return valid ? user : returnMessage;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_schema_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map