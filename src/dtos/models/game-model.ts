import { Field, ID, Float, ObjectType } from 'type-graphql'
import { Genre } from './genres-model';


// informações disponíveis para o front-end consumir
@ObjectType()
export class Game {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  dateRelease: Date;

  @Field(() => Float)
  rating: number;

  @Field()
  site: string;

  @Field(() => Genre)
  genre: Genre;
}
