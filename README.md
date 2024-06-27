# api-node
 criando api com node e apollo
[Tutorial](https://www.youtube.com/watch?v=1dz48pReq_c&ab_channel=Rocketseat)
[github api-node](https://github.com/ederPires/api-devgame)
[Documentação Apollo](https://www.apollographql.com/docs/apollo-server/)
[Typegraphql](https://typegraphql.com/docs/introduction.html)
[Figma](https://www.figma.com/design/nm1k9zoVt2vdBZV6RtmWAk/Game-App-Desafio?node-id=0-1)

#### Configurações inicias

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

npm install bcryptjs

npm install @types/bcryptjs --save-dev

```

#### Postgres

```Javascript
// Mudar para postgres
yarn add typeorm pg reflect-metadata // instalar pacote necessário

yarn typeorm migration:create -n CreateUserTable // fazer a migração

yarn add typeorm-typedi-extensions // instalar pacote necessário

yarn add typedi // instalar pacote necessário

npm run migration:revert // reverte as migrações feitas
// Erro de migração corrigido no package
// apagar as migrations, gerar novamente
// erro de tipo integer
ChangeRatingTypeToFloat // criar migration

npm run migration:generate // migração com npm, funcionou

npm run migration:run // rodar migração

npm run dev // rodar projeto

```
#### Middleware

```Javascript
npm install graphql-middleware // instalar pacote necessário

npm install type-graphql typeorm apollo-server express express-session reflect-metadata

// token
npm install jsonwebtoken



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

docker compose up // rodar o docker com mysql

```

#### Docker

```Javascript

docker compose exec db bash // entrar no docker
mysql -u root -p // entrar no mysql
show tables; // ver as tabelas
select * from User; // ver os dados de User
describre User; // ver a estrutura de User
exit // sair do mysql
exit // sair do docker

npx typeorm migration:run -d src/database/connection.ts // erro

node run-migrations.js //erro mas foi

// error 1.0
npm install ts-node typescript

npx tsc

// error 1.2

docker rm mysql-container // remover um container

ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run

docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -d mysql:latest --default-authentication-plugin=mysql_native_password

docker run --name game-container -e MYSQL_ROOT_PASSWORD=root -d mysql:latest --default-authentication-plugin=mysql_native_password --protocol=TCP --mysqlx=OFF

docker compose up // rodar o docker com mysql

docker compose exec db bash // entrar no docker

mysql -u ederpbj -p // entrar no mysql

CREATE USER 'ederpbj' IDENTIFIED WITH mysql_native_password BY 'b@tista'; //cria um novo usuário no mysql

GRANT ALL PRIVILEGES ON *.* TO 'ederpbj'; // dar privilégios

FLUSH PRIVILEGES; // confirmar, exit, exit

//configurar o ormconfig

yarn typeorm migration:run // migrar o banco

npm install -g ts-node // instalar type-script global

npm install typescript

// migração ok
 npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/database/data-source.ts

npm run dev:server // rodar e testar

yarn add typeorm-typedi-extensions
yarn add typedi

// acessando mysql
docker compose exec db bash // entrar no docker

mysql -u ederpbj -p // entrar no mysql

use dbgame // seleciona o db

show tables; // exibe as tabelas

SELECT * FROM migrations

yarn global add typeorm ts-node

npm run dev // rodar

typeorm migration:create -n CriarTabelaGame -d src/database/migrations

typeorm migration:create ./path-to-migrations-dir/PostRefactoring

npx typeorm migration:create -n CriarTabelaGame -d src/migrations


npm run migration:generate // migração com npm, funcionou

npm run migration:run // rodar

```
