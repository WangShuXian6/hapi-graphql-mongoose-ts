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
const data_1 = require("../data");
const Task_1 = require("../schemas/Task");
let default_1 = class default_1 {
    fetchTasks() {
        return data_1.tasks;
    }
    getTask(id) {
        return data_1.tasks.find((task) => task.id === id);
    }
    markAsCompleted(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectDatasource } = ctx.dataSources;
            const { Task } = projectDatasource;
            const task = yield Task.findOne({ id });
            if (!task) {
                throw new Error(`Couldn't find the task with id ${id}`);
            }
            if (task.completed === true) {
                throw new Error(`Task with id ${id} is already completed`);
            }
            const _task = yield Task.updateOne({ id }, { completed: false });
            return _task;
        });
    }
    createTask(title, completed, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectDatasource } = ctx.dataSources;
            const { Task } = projectDatasource;
            const task = yield Task.create({ title, completed });
            return task;
        });
    }
    project(taskData) {
        return data_1.projects.find((project) => {
            return project.id === taskData.project_id;
        });
    }
};
__decorate([
    type_graphql_1.Query((returns) => [Task_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], default_1.prototype, "fetchTasks", null);
__decorate([
    type_graphql_1.Query((returns) => Task_1.Task, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", (type) => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], default_1.prototype, "getTask", null);
__decorate([
    type_graphql_1.Mutation((returns) => Task_1.Task),
    __param(0, type_graphql_1.Arg("id", (type) => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "markAsCompleted", null);
__decorate([
    type_graphql_1.Mutation((returns) => Task_1.Task),
    __param(0, type_graphql_1.Arg("title", (type) => String)),
    __param(1, type_graphql_1.Arg("completed", (type) => Boolean)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "createTask", null);
__decorate([
    type_graphql_1.FieldResolver((returns) => Task_1.Task),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], default_1.prototype, "project", null);
default_1 = __decorate([
    type_graphql_1.Resolver((of) => Task_1.Task)
], default_1);
exports.default = default_1;
//# sourceMappingURL=TaskResolver.js.map