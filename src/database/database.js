const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria ou abre o banco de dados no arquivo especificado
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Exporta o objeto db para ser usado em outros módulos
module.exports = db;
