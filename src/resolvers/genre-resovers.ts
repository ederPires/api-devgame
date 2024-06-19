import { Arg, FieldResolver, ID, Mutation, Query, Resolver, Root } from 'type-graphql';
import { CreateGenreInput } from '../dtos/inputs/create-genre-inputs';
import { Genre } from '../dtos/models/genres-model';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

const genres: Genre[] = [
  {
    id: uuidv4(),
    name: 'Tiro',
  },
  {
    id: uuidv4(),
    name: 'Ação',
  },
  {
    id: uuidv4(),
    name: 'Aventura',
  },
  {
    id: uuidv4(),
    name: 'Luta',
  },
];

@Resolver(() => Genre)
export class GenreResolver {
  // Lista os generos
  @Query(() => [Genre]) // Alteração aqui para retornar um array de Genre
  async genres(): Promise<Genre[]> {
    return genres; // Retorne um array vazio ou os appointments reais do banco de dados
  }

  // Cria um genre
  @Mutation(() => Genre) // vem do model
  async CreateGenre(@Arg('data') data: CreateGenreInput): Promise<Genre> {
    // Simula a criação de um objeto Game com os dados fornecidos
    // Gera um ID único para o novo gênero
    const id = uuidv4();

    const genre: Genre = {
      id,
      name: data.name,
    };
    // Aqui seria o lugar para a lógica real de criação do game no banco de dados, por exemplo
    genres.push(genre); // Adicionando o novo game à lista persistente

    return genre;
  }
}
