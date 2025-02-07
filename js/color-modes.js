document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll(".bd-mode-toggle button"); // Selecciona todos los botones dentro de .bd-mode-toggle
  const themeText = document.querySelector("#bd-theme-text");

  if (!themeButtons.length || !themeText) return; // Evita errores si los elementos no existen

  themeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const newTheme = this.getAttribute("data-bs-theme-value"); // Obtiene el valor del tema desde el atributo data-bs-theme-value
      if (!newTheme) return;

      document.documentElement.setAttribute("data-bs-theme", newTheme);
      themeText.textContent = `Toggle theme (${newTheme})`;

      // Añadir o quitar la clase dark-mode en el body
      if (newTheme === "dark") {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    });
  });

  // Verificar el tema inicial y aplicar la clase dark-mode si es necesario
  const initialTheme = document.documentElement.getAttribute("data-bs-theme");
  if (initialTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
