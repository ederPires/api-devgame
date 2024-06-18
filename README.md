# api-node
 criando api com node e apollo
[Tutorial](https://www.youtube.com/watch?v=1dz48pReq_c&ab_channel=Rocketseat)
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

#### Bancos de Dados Relacionais
- MySQL/MariaDB: Amplamente utilizado, oferece suporte a transações e integridade referencial.
- PostgreSQL: Um banco de dados relacional poderoso com muitas funcionalidades avançadas.
- SQLite: Um banco de dados leve que é fácil de configurar e usar.

#### Bancos de Dados Não-Relacionais (NoSQL)
- MongoDB: Armazena dados em formato JSON, ideal para dados não estruturados.
- Redis: Um banco de dados em memória que é rápido e adequado para cache e dados temporários.
- Cassandra: Adequado para grandes volumes de dados distribuídos.


#### Escolhendo um Banco de Dados
A escolha do banco de dados depende de vários fatores, incluindo:

1. Estrutura dos Dados: Se os dados são altamente estruturados, um banco de dados relacional pode ser mais adequado. Se os dados são menos estruturados ou em formato de documentos, um banco de dados NoSQL pode ser melhor.
2. Escalabilidade: Bancos de dados como Cassandra são projetados para grandes volumes de dados distribuídos.
3. Desempenho: Redis é ótimo para armazenamento em cache devido à sua velocidade.
4. Facilidade de Uso: SQLite é fácil de configurar e usar para aplicações menores ou de desenvolvimento local.
Escolha o banco de dados que melhor se adapta às necessidades específicas do seu projeto e aos requisitos de escalabilidade e desempenho.


quais desses bancos de dados são gratuitos

Muitos bancos de dados oferecem versões gratuitas, ideais para desenvolvimento, projetos pequenos e até mesmo alguns usos em produção. Aqui estão algumas opções populares e detalhes sobre suas versões gratuitas:

#### Bancos de Dados Relacionais

MySQL

Versão Gratuita: MySQL Community Edition
Descrição: Uma das opções de banco de dados open-source mais populares. Oferece muitas funcionalidades avançadas gratuitamente.
Mais informações

PostgreSQL

Versão Gratuita: PostgreSQL é totalmente gratuito e open-source.
Descrição: Um banco de dados relacional poderoso com suporte a muitas funcionalidades avançadas.
Mais informações

SQLite

Versão Gratuita: SQLite é totalmente gratuito e open-source.
Descrição: Um banco de dados leve e embutido, ideal para desenvolvimento e pequenos projetos.
Mais informações

#### Bancos de Dados Não-Relacionais (NoSQL)

MongoDB

Versão Gratuita: MongoDB Community Edition
Descrição: Uma versão open-source do MongoDB que oferece todas as funcionalidades básicas necessárias para o desenvolvimento.
Mais informações

Redis

Versão Gratuita: Redis Open Source
Descrição: Um banco de dados em memória rápido, usado principalmente para cache e gerenciamento de sessões.
Mais informações

Cassandra

Versão Gratuita: Apache Cassandra é totalmente gratuito e open-source.
Descrição: Um banco de dados distribuído altamente escalável, ideal para grandes volumes de dados.
Mais informações

#### Como Escolher o Banco de Dados Certo

Para Bancos de Dados Relacionais:
* MySQL: Se você precisa de uma solução bem documentada e amplamente suportada.
* PostgreSQL: Se você precisa de funcionalidades avançadas e um banco de dados poderoso.
* SQLite: Se você precisa de um banco de dados leve e fácil de configurar para desenvolvimento ou pequenos projetos.

Para Bancos de Dados Não-Relacionais (NoSQL):
* MongoDB: Se você precisa armazenar dados não estruturados em formato JSON e quer uma solução fácil de escalar.
* Redis: Se você precisa de alta performance para cache ou gerenciamento de sessões.
* Cassandra: Se você precisa de alta disponibilidade e escalabilidade para grandes volumes de dados.
Todas essas opções oferecem versões gratuitas e robustas para começar seus projetos de desenvolvimento. Dependendo das necessidades específicas do seu projeto, você pode optar por uma dessas soluções gratuitas para começar a integrar seu banco de dados.
