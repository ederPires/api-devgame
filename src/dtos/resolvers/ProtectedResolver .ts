import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { IsAuthenticated } from '../../middlewares/IsAuthenticatedMiddleware';
import { Genre } from '../../models/GenresModel';
import { AppDataSource } from '../../database/data-source';

@Resolver()
export class ProtectedResolver {
  private genreRepository = AppDataSource.getRepository(Genre);

  @Query(() => String) // Ajuste o tipo retornado conforme necessário
  @UseMiddleware(IsAuthenticated)
  async protectedData(): Promise<string> {
    // Certifique-se de que este resolver retorna uma string
    // Aqui é um exemplo simplificado
    return "Protected Data";
  }

  @Query(() => [Genre]) // Adiciona uma nova query para retornar genres
  @UseMiddleware(IsAuthenticated)
  async genres(): Promise<Genre[]> {
    return this.genreRepository.find();
  }
}
