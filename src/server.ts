import {ApolloServer } from 'apollo-server';
import { resolvers } from 'graphql-scalars';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import path from 'node:path';
import { GameResolver } from './resolvers/game-resovers';
import { GenreResolver } from './resolvers/genre-resovers';


// Servidor avançado
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      GameResolver,
      GenreResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  })
  const server = new ApolloServer({
    schema,
  })


  const { url } = await server.listen()

  console.log(`  🚀 HTTP server running on ${url}`);
}

bootstrap();
