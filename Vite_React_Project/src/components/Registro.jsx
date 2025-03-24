import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, CloseButton } from "react-bootstrap";
import {
  createAuthUserWithEmailAndPassword,
  saveUserData,
} from "../utils/firebase.utils";
import "../styles/Registro.css";

const Register = ({ setUsuario }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombre,
      apellidos,
      direccion,
      ciudad,
      codigoPostal,
      telefono,
      email,
      password,
      confirmPassword,
    } = formData;

    if (password !== confirmPassword) {
      setAlertMessage("Las contraseñas no coinciden.");
      setAlertVariant("danger");
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userId = response.user.uid;
      const userData = {
        Nombre: nombre,
        Apellidos: apellidos,
        Direccion: direccion,
        Ciudad: ciudad,
        CodigoPostal: codigoPostal,
        Telefono: telefono,
        Correo: email,
        Comprados: [],
        Creados: [],
      };
      await saveUserData(userId, userData);
      //console.log("Registro exitoso:", response.user);
      setAlertMessage("Registro exitoso.");
      setAlertVariant("success");

      // Guardar el token de autenticación en el localStorage
      localStorage.setItem(
        "authToken",
        response.user.stsTokenManager.accessToken
      );

      // Guardar los datos del usuario en el localStorage para auto-llenar el ShippingInfo
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, id: userId })
      );

      setUsuario(userData);
      navigate("/");
    } catch (error) {
      console.error("Registro fallido:", error);
      setAlertMessage("Error al registrar. Por favor, intenta nuevamente.");
      setAlertVariant("danger");
    }
  };

  const handleClose = () => {
    navigate("/login");
  };

  return (
    <Container className="register-container">
      <div className="register-header">
        <h2 className="text-registro">Registro</h2>
        <CloseButton onClick={handleClose} className="close-button" />
      </div>
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
        <Form.Group controlId="nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="apellidos">
          <Form.Label>Apellidos:</Form.Label>
          <Form.Control
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="direccion">
          <Form.Label>Dirección:</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="ciudad">
          <Form.Label>Ciudad:</Form.Label>
          <Form.Control
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="codigoPostal">
          <Form.Label>Código Postal:</Form.Label>
          <Form.Control
            type="text"
            name="codigoPostal"
            value={formData.codigoPostal}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Teléfono:</Form.Label>
          <Form.Control
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirmar Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="register-button w-100 mt-3 m-0"
        >
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

Register.propTypes = {
  setUsuario: PropTypes.func.isRequired,
};

export default Register;
