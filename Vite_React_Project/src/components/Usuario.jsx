import PropTypes from "prop-types";
import { Container, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../styles/Usuario.css";
import PedidosRealizados from "./PedidosRealizados";

const Usuario = ({ usuario, onLogout }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    localStorage.removeItem("authToken"); // Clear auth token from local storage
    onLogout(); // Call the onLogout function passed as a prop
    navigate("/login");
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!usuario) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  const pedidosArray = usuario.Comprados
    ? Object.values(usuario.Comprados)
    : [];

  return (
    <Container className="mt-2">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="p-4 border rounded shadow-sm container-usuario">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Perfil de Usuario</h2>
              <Button
                variant="danger"
                size="md"
                onClick={handleShowModal}
                className="w-25 logout-button"
              >
                <span className="logout-text">Cerrar Sesión</span>
                <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
              </Button>
            </div>
            <div>
              <p>
                <strong>Nombre:</strong> {usuario.Nombre}
              </p>
              <p>
                <strong>Apellidos:</strong> {usuario.Apellidos}
              </p>
              <p>
                <strong>Dirección:</strong> {usuario.Direccion}
              </p>
              <p>
                <strong>Código Postal:</strong> {usuario.CodigoPostal}
              </p>
              <p>
                <strong>Teléfono:</strong> {usuario.Telefono}
              </p>
              <p>
                <strong>Correo Electrónico:</strong> {usuario.Correo}
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <div className="pedidos-container">
            <PedidosRealizados pedidos={pedidosArray} />
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres cerrar la sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

Usuario.propTypes = {
  usuario: PropTypes.shape({
    Nombre: PropTypes.string.isRequired,
    Apellidos: PropTypes.string.isRequired,
    Direccion: PropTypes.string.isRequired,
    CodigoPostal: PropTypes.string.isRequired,
    Telefono: PropTypes.string.isRequired,
    Correo: PropTypes.string.isRequired,
    Comprados: PropTypes.objectOf(
      PropTypes.shape({
        Nombre_completo: PropTypes.string.isRequired,
        Direccion: PropTypes.string.isRequired,
        Ciudad: PropTypes.string.isRequired,
        Codigo_postal: PropTypes.string.isRequired,
        Telefono: PropTypes.string.isRequired,
        Total: PropTypes.number.isRequired,
        Productos: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            nombre: PropTypes.string.isRequired,
            cantidad: PropTypes.number.isRequired,
            precio_unitario: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
          })
        ).isRequired,
      })
    ),
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Usuario;
