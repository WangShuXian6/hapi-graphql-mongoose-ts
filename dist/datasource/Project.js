"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_1 = require("apollo-datasource");
const connection_1 = __importDefault(require("../lib/connection"));
const Task_1 = require("../schemas/Task");
const User_1 = require("../schemas/User");
class ProjectDatasource extends apollo_datasource_1.DataSource {
    constructor(config, connection) {
        super();
        this.connection = connection || connection_1.default(config);
        console.log("connection", this.connection);
        this.Task = Task_1.TaskModel;
        this.User = User_1.UserModel;
    }
}
exports.default = ProjectDatasource;
//# sourceMappingURL=Project.js.map