import { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/Item.css";
import { deleteProduct } from "../utils/firebase.utils";

function ItemSubido({
  producto,
  userId,
  actualizarUsuario,
  actualizarProductos,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowConfirmModal = (e) => {
    e.stopPropagation(); // Stop event propagation
    setShowConfirmModal(true);
  };
  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleDeleteConfirmed = () => {
    handleDelete(producto.id);
    setShowConfirmModal(false);
  };

  const handleDelete = async (productoId) => {
    try {
      // Llamar a la función de utilidades para eliminar el producto
      await deleteProduct(productoId, userId);

      // Actualizar el usuario y los productos
      if (actualizarUsuario) {
        await actualizarUsuario();
      }
      if (actualizarProductos) {
        await actualizarProductos();
      }

      alert("Producto eliminado exitosamente.");
    } catch (error) {
      alert(
        "Error al eliminar el producto: " + error.message || "Error desconocido"
      );
    }
  };

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
          <Button
            onClick={handleShowConfirmModal}
            variant="danger"
            className="m-0"
            style={{ width: "100%" }} // Added style to make the button wider
          >
            Eliminar
          </Button>
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

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar {producto.nombre}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ItemSubido.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  actualizarUsuario: PropTypes.func.isRequired,
  actualizarProductos: PropTypes.func.isRequired,
};

export default ItemSubido;
