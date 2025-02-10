document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    if (form.checkValidity() === false) {
      form.classList.add("was-validated");
    } else {
      const email = document.getElementById("email").value;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        document.getElementById("email").classList.add("is-invalid");
        document.getElementById("invalid-feedback-password").style.display =
          "none";
        document.getElementById("invalid-feedback-email").textContent =
          "El email no es válido";
        document.getElementById("invalid-feedback-email").style.display =
          "block";
      } else {
        document.getElementById("email").classList.remove("is-invalid");
        document.getElementById("invalid-feedback-email").style.display =
          "none";
        const password = document.getElementById("password").value;
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
          document.getElementById("password").classList.add("is-invalid");
          document.getElementById("invalid-feedback-password").textContent =
            "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número";
          document.getElementById("invalid-feedback-password").style.display =
            "block";
        } else {
          form.submit();
          // go to admin page
          window.location.href = "admin.html";
        }
      }
    }
  });

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    this.textContent = type === "password" ? "Mostrar" : "Ocultar";
  });
