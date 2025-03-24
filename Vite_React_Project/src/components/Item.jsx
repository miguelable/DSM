import { useState } from "react";
import { Card, Button, Col, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaPlus, FaMinus } from "react-icons/fa"; // Importar los iconos
import "../styles/Item.css";

function Item({ producto, agregarAlCarrito, eliminarDelCarrito, carrito }) {
  const [showModal, setShowModal] = useState(false);
  const cantidad = carrito[producto.id] || 0;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Col sm={12} md={6} lg={4} className="mb-4">
        <Card onClick={handleShowModal}>
          <Card.Img variant="top" src={producto.imagen} />
          <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text>{producto.precio}€</Card.Text>
            <div className="d-flex justify-content-between">
              <Button
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  eliminarDelCarrito(producto.id);
                }}
              >
                <FaMinus /> {/* Icono de menos */}
              </Button>
              <span>{cantidad}</span>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  agregarAlCarrito(producto.id);
                }}
              >
                <FaPlus /> {/* Icono de más */}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <p>
            <strong>Precio:</strong> €{producto.precio}
          </p>
          <p>
            <strong>Descripción:</strong> {producto.descripcion}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="modal-close-button"
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

Item.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
  }).isRequired,
  agregarAlCarrito: PropTypes.func.isRequired,
  eliminarDelCarrito: PropTypes.func.isRequired,
  carrito: PropTypes.object.isRequired,
};

export default Item;
