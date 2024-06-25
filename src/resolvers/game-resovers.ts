import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { CreateGameInput } from '../dtos/inputs/create-game-inputs';
import { Game } from '../dtos/models/game-model';
import { Genre } from '../dtos/models/genres-model';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Resolver(() => Game)
export class GameResolver {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>
  ) {}

  @Query(() => String)
  async helloGame() {
    return 'Hello Game';
  }

  // Lista os games
  @Query(() => [Game])
  async games(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['genre'] });
  }

  // Cria um game
  @Mutation(() => Game)
  async CreateGame(@Arg('data') data: CreateGameInput): Promise<Game> {
    const genre = await this.genreRepository.findOne({ id: data.genreId });
    if (!genre) {
      throw new Error('Gênero não encontrado');
    }

    const game = this.gameRepository.create({
      ...data,
      genre,
    });

    await this.gameRepository.save(game);

    return game;
  }

  @FieldResolver(() => Genre)
  async genre(@Root() game: Game): Promise<Genre | null> {
    if (!game.genre) {
      return null; // Ou lançar um erro, dependendo do comportamento desejado
    }
    return this.genreRepository.findOne({ id: game.genre.id });
  }
}
