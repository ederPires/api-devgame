import { createConnection } from 'typeorm';
import path from 'path';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'dbgame',
  entities: [
    path.join(__dirname, '../dtos/models/**/*.ts')
  ],
  migrations: [
    path.join(__dirname, '../migration/**/*.ts')
  ],
  subscribers: [
    path.join(__dirname, '../subscriber/**/*.ts')
  ],
  synchronize: false, // Set to true for development, false for production
  logging: true
}).then(connection => {
  // Here you can start to work with your entities
}).catch(error => console.log(error));
