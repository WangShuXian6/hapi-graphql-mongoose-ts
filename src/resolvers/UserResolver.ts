import {
  Arg,
  //FieldResolver,
  Mutation,
  Query,
  //Int,
  Resolver,
  //Root,
  Ctx,
  //Authorized,
  ObjectType,
  //InputType,
  Field,
} from "type-graphql";
// import { MaxLength, Length } from "class-validator";
// import { projects, tasks, TaskData } from "../data";
import { hash, compare } from "bcryptjs";
// import { sign, verify } from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { User } from "../schemas/User";
import { Role } from "../interface/role";

import { ApolloContext } from "../server";

type _User = Pick<
  User,
  "email" | "password" | "_id" | "name" | "roles" | "openId"
>;

export const createAccessToken = (user: _User): string => {
  return sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: _User): string => {
  return sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@Resolver((of) => User)
export default class {
  @Query(() => [User])
  users(@Ctx() ctx: ApolloContext) {
    const { projectDatasource } = ctx.dataSources;
    const { User } = projectDatasource;
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: ApolloContext
  ) {
    const { projectDatasource } = ctx.dataSources;
    const { User } = projectDatasource;
    const hashedPassword = await hash(password, 12);
    await User.create({
      email,
      password: hashedPassword,
      roles: [Role.USER],
    });
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: ApolloContext
  ): Promise<LoginResponse> {
    console.log(1);
    const { projectDatasource } = ctx.dataSources;
    console.log(2);
    const { User } = projectDatasource;
    console.log("email:", email);
    const user = await User.findOne({ email }).lean(true);
    
    console.log("user", user);
    if (!user) {
      throw new Error("User does not exist.");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Wrong password.");
    }

    //ctx.request.request.cookieAuth.set({ jwtid: createRefreshToken(user) });

    return {
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user),
    };
  }

  @Mutation(() => LoginResponse)
  async loginWechat(
    @Arg("wechatCode") wechatCode: string,
    @Arg("avatar") avatar: string,
    @Arg("nickname") nickname: string,
    @Ctx() ctx: ApolloContext
  ): Promise<LoginResponse> {
    const { projectDatasource } = ctx.dataSources;
    const { User } = projectDatasource;
    const openId = "";
    let user;
    user = await User.findOne({ openId });
    if (!user) {
      user = await User.create({
        openId,
        roles: [Role.USER],
      });
    }
    return {
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user),
    };
  }
}
