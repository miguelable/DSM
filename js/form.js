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
      const password = document.getElementById("password").value;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        document.getElementById("password").classList.add("is-invalid");
      } else {
        form.submit();
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
