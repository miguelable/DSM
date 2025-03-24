import { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import emailjs from "@emailjs/browser"; // Importa EmailJS
import PropTypes from "prop-types"; // Importa PropTypes
import "../styles/Contacto.css";

function Contacto({ usuario }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState(""); // Nuevo estado para el asunto
  const [mensaje, setMensaje] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Completar automáticamente los campos con los datos del usuario
  useEffect(() => {
    if (usuario) {
      setNombre(usuario.Nombre || "");
      setEmail(usuario.Correo || "");
    }
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre && email && asunto && mensaje) {
      const form = e.target; // Obtén el elemento del formulario directamente

      // Generar la fecha y hora actual
      const currentTime = new Date().toLocaleString();

      // Añadir el tiempo al formulario como un campo oculto
      const timeInput = document.createElement("input");
      timeInput.setAttribute("type", "hidden");
      timeInput.setAttribute("name", "time");
      timeInput.setAttribute("value", currentTime);
      form.appendChild(timeInput);

      // Usa EmailJS para enviar el correo
      emailjs
        .sendForm(
          "service_mv7tpao", // Reemplaza con tu Service ID
          "template_jjtmcww", // Reemplaza con tu Template ID
          form, // Pasa el formulario directamente
          "vYUO5bOnbdldFTH67" // Reemplaza con tu User ID
        )
        .then(
          (response) => {
            console.log(
              "Correo enviado con éxito:",
              response.status,
              response.text
            );
            setShowSuccess(true);
            setShowError(false);
            setNombre("");
            setEmail("");
            setAsunto("");
            setMensaje("");
          },
          (error) => {
            console.error("Error al enviar el correo:", error);
            setShowError(true);
            setShowSuccess(false);
          }
        )
        .finally(() => {
          // Elimina el campo oculto después de enviar el formulario
          form.removeChild(timeInput);
        });
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <Container className="contacto-container mt-5">
      <h2>Contacto</h2>
      <p>
        Si tienes alguna pregunta o necesitas más información, no dudes en
        contactarnos.
      </p>
      <p>
        También puedes encontrarnos en Instagram:{" "}
        <a target="_blank" rel="noopener noreferrer">
          @NFTmarketplace
        </a>
        , o llamarnos al teléfono: <strong>+34 624 786 430</strong>.
      </p>
      {showSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
        >
          ¡Mensaje enviado con éxito!
        </Alert>
      )}
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Por favor, rellena todos los campos.
        </Alert>
      )}
      <Form id="form" onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name" 
            placeholder="Introduce tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email" 
            placeholder="Introduce tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formAsunto" className="mt-3">
          <Form.Label>Asunto</Form.Label>
          <Form.Control
            type="text"
            name="title" // Campo requerido por EmailJS
            placeholder="Introduce el asunto"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formMensaje" className="mt-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message" // Campo requerido por EmailJS
            placeholder="Escribe tu mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </Form.Group>
        <Button id="button" variant="primary" type="submit" className="mt-3">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}
Contacto.propTypes = {
  usuario: PropTypes.shape({
    Nombre: PropTypes.string,
    Correo: PropTypes.string,
  }),
};

export default Contacto;
