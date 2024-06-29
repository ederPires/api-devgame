import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { AppDataSource } from './database/data-source';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { GameResolver } from './dtos/resolvers/GameResover';
import { GenreResolver } from './dtos/resolvers/GenreResover';
import { UserResolver } from './dtos/resolvers/UserResolver';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PubSub } from 'graphql-subscriptions';
import 'reflect-metadata';
import path from 'path';

dotenv.config();

async function bootstrap() {
  await AppDataSource.initialize(); // Inicialize a conexão com o banco de dados

  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({ server: httpServer });
  //const pubSub = new PubSub(); // Inicializa o PubSub para usar com GraphQL Subscriptions: error

  const clients = new Set<WebSocket>();

  wsServer.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', (message) => {
      console.log('received: %s', message);
    });

    ws.on('close', () => {
      clients.delete(ws);
    });
  });

  const pubSub = new PubSub();

  const schema = await buildSchema({
    resolvers: [GameResolver, GenreResolver, UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    authChecker: ({ context }) => {
      return !!context.payload; // Verifica se há um payload de autenticação no contexto
    },
    pubSub, // Passa o PubSub para o schema GraphQL
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => {
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

      return { req, res, payload, wsServer, clients, pubSub }; // Inclui wsServer e pubSub no contexto Apollo
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}${apolloServer.graphqlPath}`);
    console.log(`🚀 WebSocket rodando em ws://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => console.error(err));
