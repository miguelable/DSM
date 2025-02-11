document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-pills .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'active' class from all links
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      navLinks.forEach((navLink) => navLink.classList.add("link-dark"));
      // Remove 'aria-current' attribute from all links
      navLinks.forEach((navLink) => navLink.removeAttribute("aria-current"));

      // Add 'active' class to the clicked link
      this.classList.add("active");
      // set aria-current="page"
      this.setAttribute("aria-current", "page");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const gradeInputs = document.querySelectorAll(".grade-input");
  const progressBar = document.querySelector(".progress-bar");

  gradeInputs.forEach((input) => {
    input.addEventListener("input", validateAndProgress);
  });

  function validateAndProgress(event) {
    const input = event.target;
    const value = parseFloat(input.value);

    if (isNaN(value) || value < 0 || value > 10) {
      input.classList.add("is-invalid");
      input.setCustomValidity("El valor debe estar entre 0 y 10.");
      input.reportValidity();
    } else {
      input.classList.remove("is-invalid");
      input.setCustomValidity("");
      updateProgress();
    }
  }

  function updateProgress() {
    let totalGrades = 0;
    let filledGrades = 0;

    gradeInputs.forEach((input) => {
      const value = parseFloat(input.value);
      if (!isNaN(value) && value >= 0 && value <= 10) {
        totalGrades += value;
        filledGrades++;
      }
    });

    const maxGrades = gradeInputs.length * 10;
    const progress = (totalGrades / maxGrades) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);
    progressBar.textContent = `${Math.round(progress)}%`;
  }
});
