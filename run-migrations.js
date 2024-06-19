// Importe o TypeORM
const { createConnection } = require('typeorm');

// Função para executar as migrações
async function runMigrations() {
  // Crie uma conexão usando as configurações do ormconfig.json
  const connection = await createConnection();

  try {
    // Execute as migrações
    await connection.runMigrations();
    console.log('Migrations executed successfully!');
  } catch (error) {
    console.error('Error executing migrations:', error);
  } finally {
    // Feche a conexão após as migrações serem executadas
    await connection.close();
  }
}

// Chame a função para executar as migrações
runMigrations();
