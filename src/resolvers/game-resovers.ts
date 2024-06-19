import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { CreateGameInput } from '../dtos/inputs/create-game-inputs';
import { Game } from '../dtos/models/game-model';
import { Genre } from '../dtos/models/genres-model';
import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm'

// Lista de games persistentes
export const games: Game[] = [
  {
    id: uuidv4(),
    name: 'CS-gol',
    description: 'Jogo de tiro',
    dateRelease: new Date('2005-05-08'),
    rating: 7.5,
    site: 'https://www.cs.com',
    genre: genres[0],
  },
  {
    id: uuidv4(),
    name: 'Roblox',
    description: 'Jogo de mundo aberto, com blocos',
    dateRelease: new Date('2015-07-18'),
    rating: 8.9,
    site: 'https://www.roblox.com',
    genre: genres[2],
  },
  {
    id: uuidv4(),
    name: 'Horizon zero down',
    description: 'Jogo aventura de mundo aberto',
    dateRelease: new Date('2023-12-15'),
    rating: 9.9,
    site: 'https://www.horizon.com',
    genre: genres[2],
  },
]

@Resolver(() => Game)
export class GameResolver {
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
    const genre = await this.genreRepository.findOne(data.genreId);
    if (!genre) {
      throw new Error('Genre not found');
    }

    const game = this.gameRepository.create({
      ...data,
      genre,
    });

    await this.gameRepository.save(game);

    return game;
  }

  @FieldResolver(() => Genre)
  async genre(@Root() game: Game): Promise<Genre> {
    return this.genreRepository.findOne(game.genre.id);
  }
}
