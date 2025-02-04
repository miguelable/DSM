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
    });
  });
});
