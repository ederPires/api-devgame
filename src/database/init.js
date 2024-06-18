const db = require('./database');

// Cria a tabela "users" se não existir
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`, (err) => {
    if (err) {
      console.error('Erro ao criar tabela "users":', err.message);
    } else {
      console.log('Tabela "users" criada com sucesso.');
    }
  });
});

// Fecha a conexão
db.close((err) => {
  if (err) {
    console.error('Erro ao fechar o banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados fechada.');
  }
});
