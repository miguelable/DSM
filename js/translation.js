const translations = {
  es: {
    home: "Inicio",
    link: "Enlace",
    idiomas: "Idiomas",
    search: "Buscar",
    masterTeleco: "Master Teleco",
  },
  en: {
    home: "Home",
    link: "Link",
    idiomas: "Languages",
    search: "Search",
    masterTeleco: "Master Teleco",
  },
  fr: {
    home: "Accueil",
    link: "Lien",
    idiomas: "Langues",
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
  document.querySelector(".dropdown-toggle").textContent =
    translations[lang].idiomas;
  document.querySelector(".form-control").placeholder =
    translations[lang].search;
}
