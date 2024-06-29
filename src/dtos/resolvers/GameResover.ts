import { Resolver, Query, Mutation, Arg, Ctx, Subscription, Root } from 'type-graphql';
import { AppDataSource } from '../../database/data-source';
import { GameEntity } from '../../entities/GameEntity';
import { GenreEntity } from '../../entities/GenreEntity';
import { CreateGameInput } from '../inputs/CreateGameInput';
import { isValid, parseISO } from 'date-fns';
import { MyContext } from '../../types/MyContext'; // Adicione um tipo de contexto

@Resolver(() => GameEntity)
export class GameResolver {
  private gameRepository = AppDataSource.getRepository(GameEntity);
  private genreRepository = AppDataSource.getRepository(GenreEntity);

  @Query(() => [GameEntity])
  async games(): Promise<GameEntity[]> {
    const games = await this.gameRepository.find({ relations: ['genre'] });

    games.forEach(game => {
      if (game.dateRelease) {
        game.dateRelease = new Date(game.dateRelease).toISOString();
      }
    });

    return games;
  }

  @Mutation(() => GameEntity)
  async createGame(
    @Arg('data') data: CreateGameInput,
    @Ctx() { pubSub, clients }: MyContext // Acesse o contexto para obter pubSub e clients
  ): Promise<GameEntity> {
    const { genreId, dateRelease, ...gameData } = data;

    if (dateRelease) {
      const parsedDate = parseISO(dateRelease);
      if (!isValid(parsedDate)) {
        throw new Error(`Data de lançamento inválida: ${dateRelease}`);
      }
      gameData.dateRelease = parsedDate.toISOString();
    }

    const genre = await this.genreRepository.findOne({ where: { id: genreId } });
    if (!genre) {
      throw new Error('Gênero não encontrado');
    }

    const game = this.gameRepository.create({
      ...gameData,
      genre,
    });

    await this.gameRepository.save(game);

    if (game.dateRelease) {
      game.dateRelease = new Date(game.dateRelease).toISOString();
    }

    // Enviar a mensagem via WebSocket para todos os clientes conectados
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: 'GAME_CREATED', data: game }));
      }
    });

    // Publica o evento de subscription para notificar atualizações
    await pubSub.publish("GAME_CREATED", game);

    return game;
  }

  @Subscription(() => GameEntity, {
    topics: 'GAME_CREATED',
  })
  gameCreated(@Root() game: GameEntity): GameEntity {
    if (game.dateRelease) {
      game.dateRelease = new Date(game.dateRelease).toISOString();
    }
    return game;
  }
}
