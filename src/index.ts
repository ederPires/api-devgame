// src/index.ts
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { GameResolver } from './resolvers/game-resovers';
import { GenreResolver } from './resolvers/genre-resovers';

async function startServer() {
  await createConnection(); // Conecta ao banco de dados usando ormconfig.json

  const schema = await buildSchema({
    resolvers: [GameResolver, GenreResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen(4000, () =>
    console.log('Server is running on http://localhost:4000/graphql')
  );
}

startServer().catch((error) => console.log(error));
