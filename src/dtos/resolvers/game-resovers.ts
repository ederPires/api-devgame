import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { CreateGameInput } from '../../dtos/inputs/create-game-inputs';
import { Game } from '../../models/game-model';
import { Genre } from '../../models/genres-model';
import { AppDataSource } from '../../database/data-source';
import { AuthMiddleware } from '../../middlewares/auth-middleware';

@Resolver(() => Game)
export class GameResolver {
  private gameRepository = AppDataSource.getRepository(Game);
  private genreRepository = AppDataSource.getRepository(Genre);

  // Lista os games
  @Query(() => [Game])
  async games(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['genre'] });
  }

  // Cria um game
  @Mutation(() => Game)
  @UseMiddleware(AuthMiddleware) // Aplicando middleware de autenticação
  async createGame(@Arg('data') data: CreateGameInput): Promise<Game> {
    const { genreId, ...gameData } = data; // Separar genreId dos dados do jogo

    const genre = await this.genreRepository.findOne({ where: { id: genreId } }); // Encontrar o gênero pelo ID

    if (!genre) {
      throw new Error('Gênero não encontrado');
    }

    const game = this.gameRepository.create({
      ...gameData, // Incluir os dados do jogo
      genre: genre, // Associar o gênero encontrado ao jogo
    });

    console.log("Jogo criado com sucesso");
    console.log(game);
    await this.gameRepository.save(game); // Salvar o jogo no banco de dados

    return game; // Retornar o jogo criado
  }

  // Resolver para carregar o gênero associado ao jogo
  @FieldResolver(() => Genre)
  async genre(@Root() game: Game): Promise<Genre | null> {
    if (!game.genre) {
      return null; // Caso o jogo não tenha um gênero associado
    }
    return this.genreRepository.findOne({ where: { id: game.genre.id } }); // Carregar o gênero associado pelo ID
  }
}
