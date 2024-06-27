import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { AppDataSource } from "../../database/data-source";
import { GameEntity } from "../../entities/GameEntity";
import { GenreEntity } from "../../entities/GenreEntity";
import { CreateGameInput } from "../inputs/CreateGameInput";
import { IsAuthenticated } from "../../middlewares/IsAuthenticatedMiddleware";

@Resolver(() => GameEntity)
export class GameResolver {
  private gameRepository = AppDataSource.getRepository(GameEntity);
  private genreRepository = AppDataSource.getRepository(GenreEntity);

  @Query(() => [GameEntity])
  async games(): Promise<GameEntity[]> {
    return this.gameRepository.find({ relations: ["genre"] });
  }

  @Mutation(() => GameEntity)
  @UseMiddleware(IsAuthenticated)
  async createGame(@Arg("data") data: CreateGameInput): Promise<GameEntity> {
    const { genreId, ...gameData } = data;

    const genre = await this.genreRepository.findOne({ where: { id: genreId } });
    if (!genre) {
      throw new Error("Gênero não encontrado");
    }

    const game = this.gameRepository.create({
      ...gameData,
      genre,
    });

    await this.gameRepository.save(game);
    return game;
  }
}
