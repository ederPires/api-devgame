import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../../database/data-source";
import { GenreEntity } from "../../entities/GenreEntity";
import { CreateGenreInput } from "../inputs/CreateGenreInput";

@Resolver(() => GenreEntity)
export class GenreResolver {
  private genreRepository = AppDataSource.getRepository(GenreEntity);

  @Query(() => [GenreEntity])
  async genres(): Promise<GenreEntity[]> {
    // Buscando gêneros sem incluir os jogos associados
    return this.genreRepository.find();
  }

  @Mutation(() => GenreEntity)
  async createGenre(@Arg("data") data: CreateGenreInput): Promise<GenreEntity> {
    const genre = this.genreRepository.create(data);
    await this.genreRepository.save(genre);
    return genre;
  }
}
