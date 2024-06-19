import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateGenreInput {
  @Field()
  name: string;
}
