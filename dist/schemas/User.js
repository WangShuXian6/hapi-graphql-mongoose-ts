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
const typegoose_1 = require("@typegoose/typegoose");
// import {
//   Arg,
//   Args,
//   ArgsType,
//   Ctx,
//   Field,
//   FieldResolver,
//   Mutation,
//   ObjectType,
//   Query,
//   Resolver,
//   Root
// } from "type-graphql";
const type_graphql_1 = require("type-graphql");
//import { Mongoose, connect, Model, Document } from "mongoose";
const mongoose_1 = require("mongoose");
const role_1 = require("../interface/role");
//import Project from './Project';
//import { Role,_Role } from "../interface/role";
let User = class User extends mongoose_1.Document {
};
__decorate([
    typegoose_1.prop({}),
    type_graphql_1.Field({ nullable: true, deprecationReason: "用户名称" }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ required: true, items: role_1.Role }),
    type_graphql_1.Field((type) => [role_1.Role], { description: "用户角色" }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field((type) => String, { nullable: true, description: "密码" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field((type) => String, { nullable: true, description: "邮箱" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field((type) => String),
    __metadata("design:type", String)
], User.prototype, "openId", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
exports.User = User;
exports.UserModel = typegoose_1.getModelForClass(User, {
    schemaOptions: {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
});
//# sourceMappingURL=User.js.map