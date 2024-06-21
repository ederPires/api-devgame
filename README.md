# api-node
 criando api com node e apollo
[Tutorial](https://www.youtube.com/watch?v=1dz48pReq_c&ab_channel=Rocketseat)
[github api-node](https://github.com/ederPires/api-devgame)
[Documentação Apollo](https://www.apollographql.com/docs/apollo-server/)
[Typegraphql](https://typegraphql.com/docs/introduction.html)
[Figma](https://www.figma.com/design/nm1k9zoVt2vdBZV6RtmWAk/Game-App-Desafio?node-id=0-1)

```Javascript

npm init -y // iniciar o projeto

npm i typescript ts-node-dev -D // instalar typescript

npx tsc --init // ativa as configurações

//modificar o package.json
"dev:simple": "tsnd --respawn --transpile-only simple-server.ts" // não faz checagem de tipagem, criar arquivo simple-server

npm i graphql apollo-server // instalar graphql e apollo

// configurar o simple-server

npm run dev:simple // rodar o projeto no modo dev

npm i uuid // Para gerar IDs únicos

npm install graphql graphql-scalars type-graphql // Instalar

npm install reflect-metadata //dependências
//teste

```

#### Criando servidor avançado

caminho inicial
src/server.ts

```Javascript

"dev": "tsnd --respawn --transpile-only src/server.ts" // incluir no package

npm run dev // rodar aplicação

// criando pasta dto, Data Transfer objects, ou inputs
// inputs são os parametros a receber

// Ativar no tsconfig
"target": "ES2021",
"lib": ["es2018", "ESNext.AsyncIterable"],
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
"strictPropertyInitialization": false,
```

#### Integrar ao SQlite

```Javascript
npm install typeorm sqlite3 reflect-metadata // instalar

// Atualizar os modelos para usar as entidades do TypeORM.
// Criar o index
npm install typeorm --save-dev // atualizar o package

"scripts": {
    "typeorm": "typeorm-ts-node-commonjs"
  }

npm run typeorm migration:run // rodar as migrações
```

#### Integrar ao mysql

```Javascript
npm install typeorm reflect-metadata mysql

npm install typeorm reflect-metadata mysql apollo-server type-graphql // todas as dependências

npm install -g npm@10.8.1

npm install mysql typeorm reflect-metadata // instalar

npx typeorm migration:create -n CreateGames // criar migrations

npx typeorm migration:run // rodar as migrações


xxx

// Docker
docker compose up // rodar o docker com mysql
docker compose exec db bash // entrar no docker
mysql -u root -p // entrar no mysql
show tables; // ver as tabelas
select * from User; // ver os dados de User
describre User; // ver a estrutura de User
exit // sair do mysql
exit // sair do docker

npx typeorm migration:run -d src/database/connection.ts // erro

node run-migrations.js //erro mas foi

// Iniciando o prisma
npm install @prisma/client
npx prisma init

```
