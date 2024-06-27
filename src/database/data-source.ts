import { DataSource } from 'typeorm';
import path from 'path';
import 'dotenv/config';



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    path.join(__dirname, '../entities/**/*.ts')
  ],
  migrations: [
    path.join(__dirname, '../database/migrations/**/*.ts')
  ],
  subscribers: [
    path.join(__dirname, '../database/subscriber/**/*.ts')
  ],
  synchronize: false, // não usar em produção como true
  logging: true,
});
