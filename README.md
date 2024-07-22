# api-node
> criando api com node e apollo

## Índice

1. [Configuração](#configuração)
2. [Links](#links)
3. [Data base](#database)
4. [Middleware](#middleware)
5. [Docker](#docker)
6. [Autor](#autor)

 ## Links

* [Tutorial](https://www.youtube.com/watch?v=1dz48pReq_c&ab_channel=Rocketseat)
* [github api-node](https://github.com/ederPires/api-devgame)
* [Documentação Apollo](https://www.apollographql.com/docs/apollo-server/)
* [Typegraphql](https://typegraphql.com/docs/introduction.html)
* [Figma](https://www.figma.com/design/nm1k9zoVt2vdBZV6RtmWAk/Game-App-Desafio?node-id=0-1)



## Configuração

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

npm i date-fns // tratar datas

//Websockets

npm install graphql-ws @apollo/server @apollo/subgraph // subcription. websockets

npm install rimraf@latest // atualizar rimfa

npm outdated // verifica dependências desatualizadas

yarn add @apollo/subgraph@latest // última versão @latest

rm -rf node_modules package-lock.json // remover node_modules e package
npm install

```

## Database

### Postgres

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

## Middleware

```Javascript
npm install graphql-middleware // instalar pacote necessário

npm install type-graphql typeorm apollo-server express express-session reflect-metadata

// token
npm install jsonwebtoken



```

## Docker

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

## Autor

* Éder Pires Batista
* Contato: 83 99655-5344
* e-mail: ederpbj@gmail.com
