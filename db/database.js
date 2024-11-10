const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./consultas.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Função para criar as tabelas
db.serialize(() => {
  // Criar a tabela de usuários
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Erro ao criar tabela de usuários:', err.message);
    } else {
      console.log('Tabela de usuários verificada/criada com sucesso.');
    }
  });

  // Criar a tabela de consultas
  db.run(`CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    patientName TEXT NOT NULL,
    date TEXT NOT NULL,
    doctor TEXT NOT NULL,
    specialty TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) {
      console.error('Erro ao criar tabela de consultas:', err.message);
    } else {
      console.log('Tabela de consultas verificada/criada com sucesso.');
    }
  });
});

module.exports = db;
