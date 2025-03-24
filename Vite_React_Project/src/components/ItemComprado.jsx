import { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/Item.css";

function ItemComprado({ producto }) {
  const [showModal, setShowModal] = useState(false);

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card onClick={handleShowModal}>
        <Card.Img
          variant="top"
          src={producto.imagen}
          style={{ width: "100%", height: "200px", objectFit: "cover" }} // Added fixed size and object fit
        />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>Cantidad Comprada: {producto.cantidad}</Card.Text>
        </Card.Body>
      </Card>

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
          <p>
            <strong>Cantidad Comprada:</strong> {producto.cantidad}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            href={producto.imagen}
            download={`imagen_${producto.nombre}.jpg`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Descargar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ItemComprado.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  cantidadComprada: PropTypes.number.isRequired,
};

export default ItemComprado;
