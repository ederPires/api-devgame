import { Resolver, Mutation, Arg } from 'type-graphql';
import { UserEntity as User } from '../entities/UserEntity';
import bcrypt from 'bcryptjs';

@Resolver(User)
export class AuthResolver {
  @Mutation(() => User)
  async registerUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }

  @Mutation(() => User)
  async loginUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return user;
  }
}
