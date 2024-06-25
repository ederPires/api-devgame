import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'ederpbj',
  password: 'b@tista',
  database: 'game',
  entities: [
    path.join(__dirname, '../dtos/models/**/*.ts')
  ],
  migrations: [
    path.join(__dirname, '../migration/**/*.ts')
  ],
  subscribers: [
    path.join(__dirname, '../subscriber/**/*.ts')
  ],
  synchronize: false,
  logging: true,
});
