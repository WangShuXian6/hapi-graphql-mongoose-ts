"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const config_1 = __importDefault(require("./lib/config"));
const routes_1 = __importDefault(require("./routes"));
const methods_1 = __importDefault(require("./plugins/methods"));
const logging_1 = __importDefault(require("./plugins/logging"));
const documentation_1 = __importDefault(require("./plugins/documentation"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
//import ProjectResolver from './resolvers/ProjectResolver';
const TaskResolver_1 = __importDefault(require("./resolvers/TaskResolver"));
const apollo_server_hapi_1 = require("./apollo-server-hapi");
const Project_1 = __importDefault(require("./datasource/Project"));
const connection_1 = __importDefault(require("./lib/connection"));
function serverMethods(request) {
    return request.server.methods;
}
exports.serverMethods = serverMethods;
const port = process.env.PORT || 3001;
const host = process.env.HOST || '0.0.0.0';
function buildServer(serverOpts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config = config_1.default.init(), providedLogger, providedConnection, serverLogs = true } = serverOpts;
        const app = new hapi_1.default.Server({
            host,
            port
        });
        const connection = providedConnection || connection_1.default(config);
        const projectDatasource = new Project_1.default(config, connection);
        yield app.route(routes_1.default);
        yield app.register({
            plugin: methods_1.default,
            options: { logger: providedLogger, projectDatasource, config }
        });
        yield app.register({ plugin: logging_1.default, options: { serverLogs } });
        yield app.register(documentation_1.default);
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [TaskResolver_1.default],
            emitSchemaFile: true
        });
        const apolloServer = new apollo_server_hapi_1.ApolloServer({
            schema,
            dataSources: () => ({ projectDatasource })
        });
        yield apolloServer.applyMiddleware({
            app
        });
        yield apolloServer.installSubscriptionHandlers(app.listener);
        return app;
    });
}
exports.default = buildServer;
//# sourceMappingURL=server.js.map