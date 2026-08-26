/* ==================================
GERENCIADOR DE TEMA GLOBAL
================================== */
function inicializarTema() {
    // Busca a classe em minúsculas como no documento
    const btnThemeToggle = 
        document.querySelector(".theme-toggle-btn");

    const body = document.body;
    
    // 1. Recupera o tema salvo no navegador
    const temaSalvo = localStorage.getItem("theme");
    
    if (temaSalvo === "light") {
        body.classList.add("light");
        if (btnThemeToggle) {
            btnThemeToggle.textContent = "☀️";
        }
    } else {
        body.classList.remove("light");
        if (btnThemeToggle) {
            btnThemeToggle.textContent = "🌙";
        }
    }

    // 2. Configura a ação de clique no botão
    if (btnThemeToggle) {
        btnThemeToggle.addEventListener("click", () => {
            body.classList.toggle("light");
            
            if (body.classList.contains("light")) {
                btnThemeToggle.textContent = "☀️";
                localStorage.setItem("theme", "light");
            } else {
                btnThemeToggle.textContent = "🌙";
                localStorage.setItem("theme", "dark");
            }
        });
    }
}

// Executa a inicialização do tema
inicializarTema();