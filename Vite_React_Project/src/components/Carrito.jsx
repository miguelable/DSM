import { useState } from "react";
import { Container, Button, ListGroup, Image, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../styles/Carrito.css";
import OrderDetails from "./OrderDetails";
import ShippingInfo from "./ShippingInfo";

function Carrito({
  carrito,
  productosFirebase,
  agregarAlCarrito,
  eliminarDelCarrito,
  eliminarProductoDelCarrito,
  limpiarCarrito,
  actualizarUsuario, // Añade la prop actualizarUsuario
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false); // Nuevo estado para el modal de error de inicio de sesión
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleShowDeleteModal = (productoId) => {
    setProductoAEliminar(productoId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductoAEliminar(null);
  };

  const handleConfirmDelete = () => {
    eliminarProductoDelCarrito(productoAEliminar);
    handleCloseDeleteModal();
  };

  const handleShowOrderDetails = () => {
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
  };

  const handleShowShippingInfo = () => {
    setShowShippingInfo(true);
    setShowOrderDetails(false);
  };

  const handleCloseShippingInfo = () => {
    setShowShippingInfo(false);
  };

  const handleShowLoginErrorModal = () => {
    setShowLoginErrorModal(true);
  };

  const handleCloseLoginErrorModal = () => {
    setShowLoginErrorModal(false);
  };

  const productosEnCarrito = productosFirebase.filter(
    (producto) => carrito[producto.id]
  );

  const totalCost = productosEnCarrito.reduce((total, producto) => {
    return total + producto.precio * carrito[producto.id];
  }, 0);

  const handleLimpiarCarrito = () => {
    limpiarCarrito();
  };

  const handleRealizarCompra = () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      handleShowOrderDetails();
    } else {
      handleShowLoginErrorModal();
    }
  };

  return (
    <Container className="carrito-container">
      <h2>Mi Carrito</h2>
      {productosEnCarrito.length === 0 ? (
        <div className="no-products">
          <p>No tienes productos en tu carrito aún.</p>
          <p>¡Añade algunos para comenzar tu compra!</p>
        </div>
      ) : (
        <>
          <ListGroup>
            {productosEnCarrito.map((producto) => (
              <ListGroup.Item
                key={producto.id}
                className="d-flex align-items-center list-group-item-custom"
              >
                <Image
                  src={producto.imagen}
                  rounded
                  className="product-image"
                />
                <span className="product-name m-2">{producto.nombre}</span>
                <div className="product-controls m-2">
                  <Button
                    variant="danger"
                    onClick={() => eliminarDelCarrito(producto.id)}
                  >
                    -
                  </Button>
                  <span className="product-quantity">
                    {carrito[producto.id]}
                  </span>
                  <Button
                    variant="primary"
                    onClick={() => agregarAlCarrito(producto.id)}
                  >
                    +
                  </Button>
                </div>
                <span className="product-price m-2">
                  €{(producto.precio * carrito[producto.id]).toFixed(2)}
                </span>
                <Button
                  variant="danger"
                  onClick={() => handleShowDeleteModal(producto.id)}
                  className="delete-button"
                >
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="total-cost">
            <h4>Total: €{totalCost.toFixed(2)}</h4>
          </div>
        </>
      )}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto del carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteModal}
            className="modal-button"
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            className="modal-button"
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {productosEnCarrito.length > 0 && (
        <Button className="buy-button" onClick={handleRealizarCompra}>
          Realizar compra
        </Button>
      )}

      <OrderDetails
        show={showOrderDetails}
        handleClose={handleCloseOrderDetails}
        productosEnCarrito={productosEnCarrito}
        carrito={carrito}
        totalCost={totalCost}
        handleShowForm={handleShowShippingInfo}
      />

      <ShippingInfo
        show={showShippingInfo}
        handleClose={handleCloseShippingInfo}
        carrito={carrito}
        productosEnCarrito={productosEnCarrito}
        totalCost={totalCost}
        limpiarCarrito={handleLimpiarCarrito}
        actualizarUsuario={actualizarUsuario} // Pasa la función actualizarUsuario
      />

      <Modal show={showLoginErrorModal} onHide={handleCloseLoginErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error de inicio de sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Debes iniciar sesión para realizar una compra.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseLoginErrorModal}
            className="modal-button"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/Login")}
            className="modal-button"
          >
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

Carrito.propTypes = {
  carrito: PropTypes.object.isRequired,
  productosFirebase: PropTypes.array.isRequired,
  agregarAlCarrito: PropTypes.func.isRequired,
  eliminarDelCarrito: PropTypes.func.isRequired,
  eliminarProductoDelCarrito: PropTypes.func.isRequired,
  limpiarCarrito: PropTypes.func.isRequired,
  actualizarUsuario: PropTypes.func.isRequired, // Añade la propType para actualizarUsuario
};

export default Carrito;
