const sqlite3 = require("sqlite3").verbose();

// Conectar ao banco
const db = new sqlite3.Database("./db/database.sqlite");

// Listar todos os usuários
function listUsers() {
  db.all("SELECT id, username, email FROM users", [], (err, rows) => {
    if (err) {
      console.error("Erro ao consultar usuários:", err.message);
      return;
    }
    console.log("Usuários cadastrados:");
    console.table(rows);
  });
}

// Apagar um usuário pelo username
function deleteUser(username) {
  db.run("DELETE FROM users WHERE username = ?", [username], function (err) {
    if (err) {
      console.error("Erro ao apagar usuário:", err.message);
      return;
    }
    console.log(`Usuário '${username}' removido com sucesso.`);
  });
}

// Exemplo de uso
listUsers();
// deleteUser("gabriela"); // descomente para apagar um usuário específico
