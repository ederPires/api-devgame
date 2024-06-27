import { Resolver, Mutation, Arg, Ctx, Query, UseMiddleware } from "type-graphql";
import { UserEntity } from "../../entities/UserEntity";
import { AppDataSource } from "../../database/data-source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IsAuthenticated } from "../../middlewares/IsAuthenticatedMiddleware";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = userRepository.create({ name, email, password });
    await userRepository.save(user);
    return "User registered successfully";
  }

  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1d",
    });

    return token;
  }

  @Query(() => String)
  @UseMiddleware(IsAuthenticated)
  protectedData(@Ctx() { payload }: MyContext): string {
    return `This is protected data for user ${payload!.userId}`;
  }
}
