import { ApolloServer } from 'apollo-server';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import path from 'node:path';
import { GameResolver } from './dtos/resolvers/GameResover';
import { GenreResolver } from './dtos/resolvers/GenreResover';
import { UserResolver } from './dtos/resolvers/UserResolver';
import { AppDataSource } from './database/data-source';
import { MyContext } from './types/MyContext';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions'; // Verifique se a importação está correta

dotenv.config();

async function bootstrap() {
  await AppDataSource.initialize(); // Garantir conexão ao banco de dados

  const pubSub = new PubSub(); // Inicialização do PubSub

  const schema = await buildSchema({
    resolvers: [GameResolver, GenreResolver, UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    authChecker: ({ context }: { context: MyContext }) => {
      return !!context.payload;
    },
  });

  const httpServer = createServer();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => {
      const authHeader = req.headers.authorization;
      let payload = null;

      if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
          payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'your_secret_key');
        } catch (err) {
          console.error('Invalid token', err);
        }
      }

      return { req, res, payload, pubSub }; // Incluir pubSub no contexto
    },
  });

  await server.start();

  server.applyMiddleware({ app: httpServer });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor HTTP rodando em http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Servidor de WebSocket rodando em ws://localhost:${PORT}${server.graphqlPath}`);
  });
}

bootstrap();
