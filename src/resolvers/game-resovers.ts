import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { CreateGameInput } from '../dtos/inputs/create-game-inputs';
import { Game } from '../dtos/models/game-model';
import { Genre, genres } from '../dtos/models/genres-model';
import { v4 as uuidv4 } from 'uuid';

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
  @Query(() => [Game]) // Alteração aqui para retornar um array de Game
  async games(): Promise<Game[]> {
    return games; // retorna a lista de games
  }

  // Cria um game
  @Mutation(() => Game) // vem do model
  async CreateGame(@Arg('data') data: CreateGameInput): Promise<Game> {
    // busca um genero na lista
    const genre = genres.find((g) => g.id === data.genreId);
    if (!genre) {
      throw new Error('Genre not found');
    }

    // Simula a criação de um objeto Game com os dados fornecidos
    const game: Game = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      dateRelease: data.dateRelease,
      rating: data.rating,
      site: data.site,
      genre: genre,
    };
    // Aqui seria o lugar para a lógica real de criação do game no banco de dados, por exemplo
    games.push(game); // Adicionando o novo game à lista persistente
    
    return game;
  }

  //relaciona com o genero
  // retorna o valor do genero do objeto game
  @FieldResolver(() => Genre)
  async genre(@Root() game: Game) {
    return game.genre;
  }
}
