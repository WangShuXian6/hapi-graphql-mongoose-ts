import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Int,
  Resolver,
  Root,
  Ctx,
} from "type-graphql";
import { projects, tasks, TaskData } from "../data";
import { Task } from "../schemas/Task";

import { ApolloContext } from "../server";

@Resolver((of) => Task)
export default class {
  @Query((returns) => [Task])
  fetchTasks(): TaskData[] {
    return tasks;
  }

  @Query((returns) => Task, { nullable: true })
  getTask(@Arg("id", (type) => Int) id: number): TaskData | undefined {
    return tasks.find((task) => task.id === id);
  }

  @Mutation((returns) => Task)
  async markAsCompleted(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: ApolloContext
  ): Promise<Task> {
    const { projectDatasource } = ctx.dataSources;
    const { Task } = projectDatasource;
    const task = await Task.findOne({ id });
    if (!task) {
      throw new Error(`Couldn't find the task with id ${id}`);
    }
    if (task.completed === true) {
      throw new Error(`Task with id ${id} is already completed`);
    }
    const _task = await Task.updateOne({ id }, { completed: false });
    return _task;
  }

  @Mutation((returns) => Task)
  async createTask(
    @Arg("title", (type) => String) title: string,
    @Arg("completed", (type) => Boolean) completed: boolean,
    @Ctx() ctx: ApolloContext
  ): Promise<Task> {
    const { projectDatasource } = ctx.dataSources;
    const { Task } = projectDatasource;
    const task = await Task.create({ title, completed });
    return task;
  }

  @FieldResolver((returns) => Task)
  project(@Root() taskData: TaskData) {
    return projects.find((project) => {
      return project.id === taskData.project_id;
    });
  }
}
