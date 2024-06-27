import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import session from "express-session";
import { GameResolver } from "./dtos/resolvers/GameResover";
import { GenreResolver } from "./dtos/resolvers/GenreResover";
import { MyContext } from "./types/MyContext";
import { UserResolver } from "./dtos/resolvers/UserResolver";

async function startServer() {
  try {
    await createConnection(); // Conecta ao banco de dados usando ormconfig.json

    const schema = await buildSchema({
      resolvers: [GameResolver, GenreResolver, UserResolver],
    });

    const app = Express();

    // Configurando sessão para armazenar userId
    app.use(session({
      name: 'qid',
      secret: 'some-secret-key', // Altere para uma chave secreta mais segura em produção
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 dias
      }
    }));

    const server = new ApolloServer({
      schema,
      context: ({ req, res }): MyContext => ({ req, res }),
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log("Server is running on http://localhost:4000/graphql");
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error);
  }
}

startServer();
