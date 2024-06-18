# api-node
 criando api com node e apollo

[github api-node](https://github.com/ederPires/api-node)
[Documentação Apollo](https://www.apollographql.com/docs/apollo-server/)
[Typegraphql](https://typegraphql.com/docs/introduction.html)

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
