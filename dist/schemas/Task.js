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
//import Project from './Project';
let Task = class Task extends mongoose_1.Document {
};
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    type_graphql_1.Field((type) => Boolean),
    __metadata("design:type", Boolean)
], Task.prototype, "completed", void 0);
Task = __decorate([
    type_graphql_1.ObjectType()
], Task);
exports.Task = Task;
exports.TaskModel = typegoose_1.getModelForClass(Task, {
    schemaOptions: {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
});
//# sourceMappingURL=Task.js.map