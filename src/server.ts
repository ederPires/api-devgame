import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import path from "node:path";
import { GameResolver } from "./dtos/resolvers/GameResover";
import { GenreResolver } from "./dtos/resolvers/GenreResover";
import { UserResolver } from "./dtos/resolvers/UserResolver";
import { AppDataSource } from "./database/data-source";
import { MyContext } from "./types/MyContext";
import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  await AppDataSource.initialize(); // Garantir conexão ao banco de dados

  const schema = await buildSchema({
    resolvers: [
      GameResolver,
      GenreResolver,
      UserResolver
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    authChecker: ({ context }: { context: MyContext }) => {
      return !!context.payload;
    },
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => {
      const authHeader = req.headers.authorization;
      let payload = null;

      if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
          payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "your_secret_key");
        } catch (err) {
          console.error("Invalid token", err);
        }
      }

      return { req, res, payload };
    },
  });

  const { url } = await server.listen();
  console.log(`🚀 Servidor HTTP rodando em ${url}`);
}

bootstrap();
