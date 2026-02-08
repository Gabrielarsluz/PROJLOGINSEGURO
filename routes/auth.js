const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users");

const router = express.Router();

// Cadastro
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    await User.createUser(username, email, password);
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      res.status(400).send("Usuário ou e-mail já existe.");
    } else {
      res.status(500).send("Erro ao cadastrar usuário.");
    }
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findUserByUsername(username);
  if (!user) {
    return res.status(400).send("Usuário não encontrado.");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).send("Senha incorreta.");
  }

  res.send("Login realizado com sucesso!");
});

module.exports = router;
