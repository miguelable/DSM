import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Container, Form, Button, Alert } from "react-bootstrap";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  saveUserData,
  getUserData,
} from "../utils/firebase.utils";
import { FaGoogle, FaUserPlus } from "react-icons/fa"; // Importa el ícono de Google de react-icons

const Login = ({ setUsuario }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      //console.log("Login successful:", response.user);
      setAlertMessage("Inicio de sesión exitoso.");
      setAlertVariant("success");

      localStorage.setItem(
        "authToken",
        response.user.stsTokenManager.accessToken
      );

      const userData = await getUserData(response.user.uid);
      setUsuario(userData);

      // Guardar los datos del usuario en el localStorage para auto-llenar el ShippingInfo
      localStorage.setItem("userData", JSON.stringify({ ...userData, id: response.user.uid }));

      // Update header with user's name
      setUsuario((prevUser) => ({ ...prevUser, Nombre: userData.Nombre }));

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.code === "auth/invalid-credential") {
        setAlertMessage(
          "Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña."
        );
      } else {
        setAlertMessage(
          "Error al iniciar sesión. Por favor, intenta nuevamente."
        );
      }
      setAlertVariant("danger");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithGooglePopup();
      //console.log("Google login successful:", response.user);
      setAlertMessage("Inicio de sesión con Google exitoso.");
      setAlertVariant("success");

      localStorage.setItem(
        "authToken",
        response.user.stsTokenManager.accessToken
      );

      // Verificar si el usuario ya existe en la base de datos
      const existingUser = await getUserData(response.user.uid);

      if (!existingUser) {
        // Extraer el nombre de la parte izquierda del correo
        const email = response.user.email;
        const nombre = email.split("@")[0];

        const userData = {
          Nombre: nombre,
          Apellidos: "",
          Direccion: "",
          Ciudad: "",
          CodigoPostal: "",
          Telefono: "",
          Correo: email,
          Comprados: [],
          Creados: [],
        };

        // Guardar los datos del usuario en la base de datos
        await saveUserData(response.user.uid, userData);
        setUsuario(userData);
      } else {
        setUsuario(existingUser);
      }

      const userData = existingUser || {
        Nombre: response.user.displayName,
        Apellidos: "",
        Direccion: "",
        Ciudad: "",
        CodigoPostal: "",
        Telefono: "",
        Correo: response.user.email,
        Comprados: [],
        Creados: [],
      };

      // Guardar los datos del usuario en el localStorage para auto-llenar el ShippingInfo
      localStorage.setItem("userData", JSON.stringify({ ...userData, id: response.user.uid }));

      // Update header with user's name
      setUsuario((prevUser) => ({ ...prevUser, Nombre: userData.Nombre }));

      // Redirigir al usuario a la página principal o a otra página
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      setAlertMessage("Error al iniciar sesión con Google.");
      setAlertVariant("danger");
    }
  };

  return (
    <Container className="login-container">
      <h2 className="text-center">Iniciar Sesión</h2>
      {alertMessage && (
        <Alert
          variant={alertVariant}
          onClose={() => setAlertMessage("")}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="login-button w-100 mt-3 m-0"
        >
          Iniciar Sesión
        </Button>
      </Form>
      <div className="text-center mt-3">
        <Button
          variant="outline-danger"
          onClick={handleGoogleLogin}
          className="w-100 m-0"
        >
          <FaGoogle className="me-2" /> Iniciar Sesión con Google
        </Button>
      </div>
      <div className="text-center mt-3">
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/registro")}
          className="w-100 m-0"
        >
          <FaUserPlus className="me-2" /> ¿No tienes cuenta? Regístrate
        </Button>
      </div>
    </Container>
  );
};
Login.propTypes = {
  setUsuario: PropTypes.func.isRequired,
};

export default Login;
