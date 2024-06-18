import {ApolloServer } from 'apollo-server';
import { resolvers } from 'graphql-scalars';
import "reflect-metadata";
import { AppointmentsResolver } from './resolvers/appointments-resolvers';
import { buildSchema } from 'type-graphql';
import path from 'node:path';

// Servidor avançado
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      AppointmentsResolver,
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
