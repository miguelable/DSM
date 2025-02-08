const translations = {
  es: {
    home: "Inicio",
    link: "Enlace",
    search: "Buscar",
    masterTeleco: "Master Teleco",
    light_text: "Claro",
    dark_text: "Oscuro",
    auto_text: "Auto",
  },
  en: {
    home: "Home",
    link: "Link",
    search: "Search",
    masterTeleco: "Master Teleco",
    light_text: "Light",
    dark_text: "Dark",
    auto_text: "Auto",
  },
  fr: {
    home: "Accueil",
    link: "Lien",
    search: "Rechercher",
    masterTeleco: "Master Teleco",
    light_text: "Lumière",
    dark_text: "Sombre",
    auto_text: "Auto",
  },
};

function changeLanguage(lang) {
  document.querySelector(".navbar-brand").textContent =
    translations[lang].masterTeleco;
  document.querySelector(".nav-link.active").textContent =
    translations[lang].home;
  document.querySelector('.nav-link[href="#"]').textContent =
    translations[lang].link;
  document.querySelector(".form-control").placeholder =
    translations[lang].search;
  document.getElementById("light_text").textContent =
    translations[lang].light_text;
  document.getElementById("dark_text").textContent =
    translations[lang].dark_text;
  document.getElementById("auto_text").textContent =
    translations[lang].auto_text;
}
