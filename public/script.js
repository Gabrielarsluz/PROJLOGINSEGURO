// Validação do formulário de cadastro
document.getElementById("registerForm").addEventListener("submit", function(event) {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Validação básica
  if (username.length < 3 || username.length > 20) {
    alert("Usuário deve ter entre 3 e 20 caracteres.");
    event.preventDefault();
    return;
  }

  // Regex simples para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Digite um e-mail válido.");
    event.preventDefault();
    return;
  }

  // Senha forte: mínimo 8 caracteres, pelo menos uma letra e um número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("A senha deve ter no mínimo 8 caracteres, incluindo letras e números.");
    event.preventDefault();
    return;
  }
});

// Validação do formulário de login
document.getElementById("loginForm").addEventListener("submit", function(event) {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (username === "" || password === "") {
    alert("Preencha todos os campos.");
    event.preventDefault();
  }
});
