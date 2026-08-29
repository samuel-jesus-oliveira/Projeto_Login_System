const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const Email = document.getElementById("email");
  const Confirmar = document.getElementById("confirmar");

  const nome = document.getElementById("nome").value;
  const email = Email.value;
  const senha = document.getElementById("senha").value;
  const confirmar = Confirmar.value;

  if (senha !== confirmar) {
    mostraAlert("As senhas não coincidem!", Confirmar, "erro");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        senha
      })
    });

    const json = await resposta.json();

    if (resposta.ok) {
      // Sucesso: mostra o modal e redireciona ao clicar no botão do modal
      mostraAlert(
        json.message || "Cadastro realizado com sucesso!",
        null,
        "sucesso",
        () => {
          window.location.href = "index.html";
        }
      );
    } else {
      // Erro vindo da API (ex: Email já cadastrado)
      mostraAlert(json.message || "Erro ao realizar cadastro.", Email, "erro");
    }
  } catch (error) {
    mostraAlert("Não foi possível conectar ao servidor.", null, "erro");
  }
});