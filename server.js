const express = require("express");
const helmet = require("helmet");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000;

// Middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // servir HTML/CSS/JS

// Rotas
app.use("/", authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
