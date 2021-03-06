import hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import Config from "./lib/config";
import { Logger } from "./lib/logger";
import routes from "./routes";
import methods from "./plugins/methods";
import logging from "./plugins/logging";
import documentation from "./plugins/documentation";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
//import ProjectResolver from './resolvers/ProjectResolver';
import TaskResolver from "./resolvers/TaskResolver";
import UserResolver from "./resolvers/UserResolver";
import { ApolloServer } from "./apollo-server-hapi";

import ProjectDataSource from "./datasource/Project";
import getConnection from "./lib/connection";

import { authChecker } from "./lib/auth-checker";

import { User } from "./interface/user.interface";

import { verify } from "jsonwebtoken";

// import { Role } from "./interface/role";

export interface ServerMethods {
  logger(): Logger;
  projectDatasource(): ProjectDataSource;
  config(): Config;
}

interface DataSources {
  projectDatasource: ProjectDataSource;
}

export interface ApolloContext {
  dataSources: DataSources;
  request: Request;
  h: ResponseToolkit;
  user?: User;
}

export function serverMethods(request: Request): ServerMethods {
  return request.server.methods as any;
}

const port = process.env.PORT || 3001;
const host = process.env.HOST || "0.0.0.0";

interface ServerOpts {
  config?: Config;
  serverLogs?: boolean;
  providedLogger?: Logger;
  providedConnection?: any;
}

export default async function buildServer(
  serverOpts: ServerOpts
): Promise<hapi.Server> {
  const {
    config = Config.init(),
    providedLogger,
    providedConnection,
    serverLogs = true,
  } = serverOpts;

  const app = new hapi.Server({
    host,
    port,
  });

  const connection = providedConnection || getConnection(config);
  const projectDatasource = new ProjectDataSource(config, connection);

  await app.route(routes);
  await app.register({
    plugin: methods,
    options: { logger: providedLogger, projectDatasource, config },
  });

  await app.register({ plugin: logging, options: { serverLogs } });
  await app.register(documentation);

  const schema = await buildSchema({
    resolvers: [TaskResolver, UserResolver],
    emitSchemaFile: true,
    authChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    dataSources: () => ({ projectDatasource }),
    context: async (ctx: ApolloContext) => {
      //console.log("ctx::", ctx);
      const auth = ctx.request.headers["authorization"];
      if (!auth) return ctx;

      const token = auth.split(" ")[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      console.log("payload", payload);

      if (payload === null) {
        console.log("null");
        return ctx;
      }
      if (typeof payload === "string") {
        console.log("string");
        return ctx;
      }

      const userId = (payload as any).userId;
      const { User } = projectDatasource;
      const user = await User.findById(userId).lean(true);
      console.log("user:", user);
      if (!user) {
        return ctx;
      }
      // const roleString: string = `${Role.USER}`;

      // ctx.user = {
      //   id: 1,
      //   name: "Sample user",
      //   roles: [roleString],
      // };

      ctx.user = user;
      return ctx;
    },
  });

  await apolloServer.applyMiddleware({
    app,
  });

  await apolloServer.installSubscriptionHandlers(app.listener);

  return app;
}
