import { Resolver, Query, Mutation, Arg, UseMiddleware, PubSub, PubSubEngine, Subscription, Root } from "type-graphql";
import { AppDataSource } from "../../database/data-source";
import { GameEntity } from "../../entities/GameEntity";
import { GenreEntity } from "../../entities/GenreEntity";
import { CreateGameInput } from "../inputs/CreateGameInput";
import { IsAuthenticated } from "../../middlewares/IsAuthenticatedMiddleware";
import { isValid, parseISO } from 'date-fns';

@Resolver(() => GameEntity)
export class GameResolver {
  private gameRepository = AppDataSource.getRepository(GameEntity);
  private genreRepository = AppDataSource.getRepository(GenreEntity);

  @Query(() => [GameEntity])
  async games(): Promise<GameEntity[]> {
    const games = await this.gameRepository.find({ relations: ["genre"] });

    // Formata as datas antes de retornar
    games.forEach(game => {
      if (game.dateRelease) {
        game.dateRelease = new Date(game.dateRelease).toISOString();
      }
    });

    return games;
  }

  @Mutation(() => GameEntity)
  //@UseMiddleware(IsAuthenticated) // exige autenticação
  async createGame(
    @Arg("data") data: CreateGameInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<GameEntity> {
    const { genreId, dateRelease, ...gameData } = data;

    // Verifica se a data de lançamento é válida antes de prosseguir
    if (dateRelease) {
      const parsedDate = parseISO(dateRelease);
      if (!isValid(parsedDate)) {
        throw new Error(`Data de lançamento inválida: ${dateRelease}`);
      }
      gameData.dateRelease = parsedDate.toISOString(); // Converte para o formato ISO 8601
    }

    const genre = await this.genreRepository.findOne({ where: { id: genreId } });
    if (!genre) {
      throw new Error("Gênero não encontrado");
    }

    const game = this.gameRepository.create({
      ...gameData,
      genre,
    });

    await this.gameRepository.save(game);

    // Formata a data de lançamento antes de retornar
    if (game.dateRelease) {
      game.dateRelease = new Date(game.dateRelease).toISOString();
    }

    // Publica o evento de subscription para notificar atualizações
    await pubSub.publish("GAME_CREATED", game);

    return game;
  }

  @Subscription(() => GameEntity, {
    topics: "GAME_CREATED"
  })
  gameCreated(@Root() game: GameEntity): GameEntity {
    // Formata a data de lançamento antes de enviar a subscription
    if (game.dateRelease) {
      game.dateRelease = new Date(game.dateRelease).toISOString();
    }
    return game;
  }
}
