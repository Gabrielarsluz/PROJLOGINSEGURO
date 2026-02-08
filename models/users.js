const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

// Conexão com o banco
const db = new sqlite3.Database("./db/database.sqlite");

// Criação da tabela de usuários (se não existir)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
  )
`);

module.exports = {
  createUser: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  findUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
};
