const express = require("express");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");

const app = express();
const PORT = 3000;

// Middleware
app.use(helmet()); // adiciona cabeçalhos de segurança
app.use(express.urlencoded({ extended: true })); // para ler dados de formulários
app.use(express.json()); // para ler JSON

// Simulação de "banco de dados" em memória
const users = [];

// Rota de cadastro
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validação básica no servidor
  if (!username || !email || !password) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  if (password.length < 8) {
    return res.status(400).send("Senha deve ter no mínimo 8 caracteres.");
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Armazenar usuário
  users.push({ username, email, password: hashedPassword });

  res.status(201).send("Usuário cadastrado com sucesso!");
});

// Rota de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).send("Usuário não encontrado.");
  }

  // Comparar senha com hash
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).send("Senha incorreta.");
  }

  res.send("Login realizado com sucesso!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
