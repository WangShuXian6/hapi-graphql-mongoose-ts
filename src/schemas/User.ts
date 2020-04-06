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
import { Role } from "../interface/role";
//import Project from './Project';

//import { Role,_Role } from "../interface/role";

@ObjectType()
export class User extends Document {
  // @prop()
  // @Field()
  // id: string;

  @prop({})
  @Field({ nullable: true, deprecationReason: "用户名称" })
  name?: string;

  // @Field(type => Project)
  // project: Project;

  @prop({ required: true, items: Role })
  @Field((type) => [Role!]!, { description: "用户角色" })
  roles: Role[];

  @prop()
  @Field((type) => String, { nullable: true, description: "密码" })
  password?: string;

  @prop()
  @Field((type) => String, { nullable: true, description: "邮箱" })
  email?: string;

  @prop()
  @Field((type) => String)
  openId?: string;
}

export const UserModel: Model<User> = getModelForClass(User, {
  schemaOptions: {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
});
