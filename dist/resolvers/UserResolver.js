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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
// import { MaxLength, Length } from "class-validator";
// import { projects, tasks, TaskData } from "../data";
const bcryptjs_1 = require("bcryptjs");
// import { sign, verify } from "jsonwebtoken";
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../schemas/User");
const role_1 = require("../interface/role");
exports.createAccessToken = (user) => {
    return jsonwebtoken_1.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
exports.createRefreshToken = (user) => {
    return jsonwebtoken_1.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "refreshToken", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let default_1 = class default_1 {
    users(ctx) {
        const { projectDatasource } = ctx.dataSources;
        const { User } = projectDatasource;
        return User.find();
    }
    register(email, password, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectDatasource } = ctx.dataSources;
            const { User } = projectDatasource;
            const hashedPassword = yield bcryptjs_1.hash(password, 12);
            yield User.create({
                email,
                password: hashedPassword,
                roles: [role_1.Role.USER],
            });
            return true;
        });
    }
    login(email, password, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(1);
            const { projectDatasource } = ctx.dataSources;
            console.log(2);
            const { User } = projectDatasource;
            console.log("email:", email);
            const user = yield User.findOne({ email }).lean(true);
            console.log("user", user);
            if (!user) {
                throw new Error("User does not exist.");
            }
            const isPasswordValid = yield bcryptjs_1.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Wrong password.");
            }
            //ctx.request.request.cookieAuth.set({ jwtid: createRefreshToken(user) });
            return {
                accessToken: exports.createAccessToken(user),
                refreshToken: exports.createRefreshToken(user),
            };
        });
    }
    loginWechat(wechatCode, avatar, nickname, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectDatasource } = ctx.dataSources;
            const { User } = projectDatasource;
            const openId = "";
            let user;
            user = yield User.findOne({ openId });
            if (!user) {
                user = yield User.create({
                    openId,
                    roles: [role_1.Role.USER],
                });
            }
            return {
                accessToken: exports.createAccessToken(user),
                refreshToken: exports.createRefreshToken(user),
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], default_1.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg("wechatCode")),
    __param(1, type_graphql_1.Arg("avatar")),
    __param(2, type_graphql_1.Arg("nickname")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "loginWechat", null);
default_1 = __decorate([
    type_graphql_1.Resolver((of) => User_1.User)
], default_1);
exports.default = default_1;
//# sourceMappingURL=UserResolver.js.map