const translations = {
  es: {
    light_text: "Claro",
    dark_text: "Oscuro",
    auto_text: "Auto",
    home_text: "Inicio",
    admin_text: "Administración",
    lenguage_text: "Idioma",
    spanish_text: "Español",
    english_text: "Inglés",
    french_text: "Francés",
    search_text: "Buscar",
  },
  en: {
    light_text: "Light",
    dark_text: "Dark",
    auto_text: "Auto",
    home_text: "Home",
    admin_text: "Administration",
    lenguage_text: "Language",
    spanish_text: "Spanish",
    english_text: "English",
    french_text: "French",
    search_text: "Search",
  },
  fr: {
    light_text: "Lumière",
    dark_text: "Sombre",
    auto_text: "Auto",
    home_text: "Accueil",
    admin_text: "Administration",
    lenguage_text: "Langue",
    spanish_text: "Espagnol",
    english_text: "Anglais",
    french_text: "Français",
    search_text: "Rechercher",
  },
};

function changeLanguage(lang) {
  // Cambiar el texto de los elementos de luz, oscuro y auto
  document.getElementById("light_text").textContent =
    translations[lang].light_text;
  document.getElementById("dark_text").textContent =
    translations[lang].dark_text;
  document.getElementById("auto_text").textContent =
    translations[lang].auto_text;

  // Cambiar el texto de los enlaces de la barra de navegación
  document.getElementById("home_text").textContent =
    translations[lang].home_text;
  document.getElementById("admin_text").textContent =
    translations[lang].admin_text;
  document.getElementById("language_text").textContent =
    translations[lang].lenguage_text;
  document.getElementById("spanish_text").textContent =
    translations[lang].spanish_text;
  document.getElementById("english_text").textContent =
    translations[lang].english_text;
  document.getElementById("french_text").textContent =
    translations[lang].french_text;
  document.getElementById("search_text").textContent =
    translations[lang].search_text;
  document.getElementById("search_input").placeholder =
    translations[lang].search_text;
}
