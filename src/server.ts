import { ApolloServer } from 'apollo-server';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import path from 'node:path';
import { GameResolver } from './resolvers/game-resovers';
import { GenreResolver } from './resolvers/genre-resovers';
import { UserResolver } from './resolvers/user-resolver';
import { AppDataSource } from './data-source';

async function bootstrap() {
  await AppDataSource.initialize(); // Garantir conexão ao banco de dados

  const schema = await buildSchema({
    resolvers: [
      GameResolver,
      GenreResolver,
      UserResolver // Adicionar o UserResolver aqui
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();
  console.log(`🚀 Servidor HTTP rodando em ${url}`);
}

bootstrap();
