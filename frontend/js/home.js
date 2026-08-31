document.addEventListener("DOMContentLoaded", () => {
  // 1. Verifica autenticação pelo Token JWT
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "./index.html";
    return;
  }

  // 2. Decodifica o Token JWT para pegar o nome do usuário
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const user = JSON.parse(jsonPayload);
    const welcomeEl = document.getElementById("user-welcome");

    if (welcomeEl && user.nome) {
      welcomeEl.textContent = ` ${user.nome}!`;
    }
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
  }

  // 3. Executa o logout utilizando o mostraAlert()
  const btnLogout = document.getElementById("logout-btn");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      mostraAlert(
        "Sessão encerrada com sucesso!",
        null,
        "sucesso",
        () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "./index.html";
        }
      );
    });
  }
});