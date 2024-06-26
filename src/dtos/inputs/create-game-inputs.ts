import { Field, Float, InputType } from 'type-graphql';

@InputType()
export class CreateGameInput {
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

  @Field()
  urlImage: string; // URL da imagem do jogo

  @Field()
  genreId: string; // ID do gênero que será associado ao jogo
}
