import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../dtos/models/user-model';
import { CreateUserInput } from '../dtos/inputs/create-user-input';
import { AppDataSource } from '../database/data-source';

@Resolver(() => User)
export class UserResolver {
  private userRepository = AppDataSource.getRepository(User);

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }
}
