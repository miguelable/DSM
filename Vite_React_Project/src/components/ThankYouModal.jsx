import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/MisNFT.css"; // Importar el archivo CSS

function ThankYouModal({ show, handleClose }) {
  const navigate = useNavigate();

  const handleNewOrder = () => {
    handleClose();
    navigate("/productos");
  };

  const handleViewOrders = () => {
    handleClose();
    navigate("/usuario");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>¡Gracias por tu compra!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Tu pedido ha sido realizado con éxito. ¡Gracias por comprar con
          nosotros!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleNewOrder}
          className="inicio-button"
        >
          Nuevo pedido
        </Button>
        <Button variant="secondary" onClick={handleViewOrders}>
          Mis compras
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ThankYouModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ThankYouModal;
