import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './dtos/models/user-model';
import { Genre } from './dtos/models/genre-model';
import { Game } from './dtos/models/game-model';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'dbgame',
  synchronize: true,
  logging: false,
  entities: [User, Genre, Game],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
