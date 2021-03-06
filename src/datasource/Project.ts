import { DataSource } from "apollo-datasource";
//import { Mongoose, connect, Model, Document } from "mongoose";
import { Model } from "mongoose";
import Config from "../lib/config";
import getConnection from "../lib/connection";

import { Task, TaskModel } from "../schemas/Task";
import { User, UserModel } from "../schemas/User";

export default class ProjectDatasource extends DataSource {
  private connection;
  public Task: Model<Task>;
  public User: Model<User>;

  constructor(config: Config, connection) {
    super();

    this.connection = connection || getConnection(config);
    console.log("connection", this.connection);
    this.Task = TaskModel;
    this.User = UserModel;
  }
}
