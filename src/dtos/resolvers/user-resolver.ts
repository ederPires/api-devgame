// src/dtos/resolvers/user-resolver.ts
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../models/user-model";
import { MyContext } from "../../types/MyContext";
import { AppDataSource } from "../../database/data-source";

@Resolver()
export class UserResolver {
  private userRepository = AppDataSource.getRepository(User);

  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    ctx.req.session.userId = user.id; // Salva o userId na sessão

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session.destroy((err) => {
        if (err) {
          console.log(err);
          reject(false);
        }

        ctx.res.clearCookie('qid');
        resolve(true);
      });
    });
  }
}
