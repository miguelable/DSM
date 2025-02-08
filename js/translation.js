const translations = {
  es: {
    home: "Inicio",
    link: "Enlace",
    search: "Buscar",
    masterTeleco: "Master Teleco",
  },
  en: {
    home: "Home",
    link: "Link",
    search: "Search",
    masterTeleco: "Master Teleco",
  },
  fr: {
    home: "Accueil",
    link: "Lien",
    search: "Rechercher",
    masterTeleco: "Master Teleco",
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
}
