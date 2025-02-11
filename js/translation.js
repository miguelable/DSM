const translations = {
  es: {
    light_text: "Claro",
    dark_text: "Oscuro",
    auto_text: "Auto",
    home_text: "Inicio",
    admin_text: "Administración",
    lenguage_text: "Idiomas",
    spanish_text: "Español",
    english_text: "Inglés",
    french_text: "Francés",
    search_text: "Buscar",
    SCA_text: "Sistemas de comunicaciones avanzados",
    SCA_text_1_description:
      "Asignatura dedicada al estudio de las tecnologías de comunicaciones avanzadas.",
    SCA_text_2_description: "Domina las tecnologías de comunicación.",
    know_more_text: "Saber más",
  },
  en: {
    light_text: "Light",
    dark_text: "Dark",
    auto_text: "Auto",
    home_text: "Home",
    admin_text: "Administration",
    lenguage_text: "Languages",
    spanish_text: "Spanish",
    english_text: "English",
    french_text: "French",
    search_text: "Search",
    SCA_text: "Advanced communication systems",
    SCA_text_1_description:
      "Subject dedicated to the study of advanced communication technologies.",
    SCA_text_2_description: "Master communication technologies.",
    know_more_text: "Know more",
  },
  fr: {
    light_text: "Lumière",
    dark_text: "Sombre",
    auto_text: "Auto",
    home_text: "Accueil",
    admin_text: "Administration",
    lenguage_text: "Langues",
    spanish_text: "Espagnol",
    english_text: "Anglais",
    french_text: "Français",
    search_text: "Rechercher",
    SCA_text: "Systèmes de communication avancés",
    SCA_text_1_description:
      "Matière dédiée à l'étude des technologies de communication avancées.",
    SCA_text_1_description: "Maîtrisez les technologies de communication.",
    know_more_text: "En savoir plus",
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

  // Cambiar el idioma al resto de textos
  document.getElementById("SCA_text_1").textContent =
    translations[lang].SCA_text;
  document.getElementById("SCA_text_2").textContent =
    translations[lang].SCA_text;
  document.getElementById("SCA_text_3").textContent =
    translations[lang].SCA_text;
  document.getElementById("SCA_text_1_description").textContent =
    translations[lang].SCA_text_1_description;
  document.getElementById("SCA_text_2_description").textContent =
    translations[lang].SCA_text_2_description;
  const knowMoreElements2 = document.getElementsByClassName("SCA_text");
  for (let i = 0; i < knowMoreElements2.length; i++) {
    knowMoreElements2[i].textContent = translations[lang].SCA_text;
  }
}
