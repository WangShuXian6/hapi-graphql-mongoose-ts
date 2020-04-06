import { prop, getModelForClass } from "@typegoose/typegoose";
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
import { Field, ObjectType } from "type-graphql";
//import { Mongoose, connect, Model, Document } from "mongoose";
import { Model, Document } from "mongoose";
//import Project from './Project';

@ObjectType()
export class Task extends Document {
  // @prop()
  // @Field()
  // id: string;

  @prop({ required: true })
  @Field({ description: "test" })
  title: string;

  // @Field(type => Project)
  // project: Project;

  @prop({ required: true })
  @Field((type) => Boolean)
  completed: boolean;
}

export const TaskModel: Model<Task> = getModelForClass(Task, {
  schemaOptions: {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
});
