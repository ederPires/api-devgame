import { DataSource } from 'typeorm';
import path from 'path';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'batista123',
  database: 'postgres',
  entities: [
    path.join(__dirname, '../entities/**/*.ts')
  ],
  migrations: [
    path.join(__dirname, '../database/migrations/**/*.ts')
  ],
  subscribers: [
    path.join(__dirname, '../database/subscriber/**/*.ts')
  ],
  synchronize: true, // não usar em produção como true
  logging: true,
});
