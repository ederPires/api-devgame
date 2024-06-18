import { ApolloServer, gql } from "apollo-server";
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos
//import { randomUUID } from 'node:crypto'; // Para gerar IDs únicos

/**
 * Problemas que são resolvidos pelo graphql
 * User fetching
 * Rota HTTP que retorna dados de menos
 *
 * Over fetchin
 * Rota HTTP retorna mais dados do que precisamos
 */

/**
 * Schema first approach
 * primeira coisa meche no schema, depois vai no código e cria os resolvers
 *
 * Existe outra abordagem 📖
 *
 * Code first:
 * - o schema é criado de forma automática com base no código feito
 * - próxima etapa utilizar code first com typegraphql e apollo serve
 *
 */

//rotas e retornos
const typeDefs = gql `
  type User {
    id: ID!
    name: String!
  }

  input UpdateUserInput {
    id: ID!
    name: String!
  }

  type Query {
    users: [User!]!
    #helloWorld: String! #! exclamação indica que é obrigatório o tipo descrito
  }

  type Mutation {
    createUser(name: String!): User!
    removeUser(id: ID!): Boolean!
    updateUser(input: UpdateUserInput!): User!
  }

`;

interface User {
  id: string;
  name: string;
}

const users: User[] = [];

//consultas
const server = new ApolloServer({
  typeDefs,
  resolvers: { //equivale aos controlers, testar no localhost
    Query: {
      users: () => {
        return users;
      }
    },

    //altera os dados
    //resolvers = https://www.apollographql.com/docs/apollo-server/data/resolvers
    Mutation: {
      createUser: (_, args) => {
        const newUser: User = {
          id: uuidv4(),
          name: args.name
        }
        users.push(newUser);
        return newUser;
      },
      removeUser: (_, args) => { // parent (se não usa coloca _), args, ctx
        const userIndex = users.findIndex(user => user.id === args.id);
        if (userIndex === -1) {
          return false; // Usuário não encontrado
        }
        users.splice(userIndex, 1);
        return true; // Usuário removido com sucesso
      },
      updateUser: (_, args) => {
        const { id, name } = args.input;
        const userToUpdate = users.find(user => user.id === id);
        if (!userToUpdate) {
          throw new Error('User not found 👯 ');
        }
        userToUpdate.name = name;
        return userToUpdate;
      }
    },
  },
})



  server.listen().then(({ url }) => {
    console.log(`  🚀 HTTP server running on ${url}`);
  })
