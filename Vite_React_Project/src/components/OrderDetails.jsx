import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

function OrderDetails({ show, handleClose, productosEnCarrito, carrito, totalCost, handleShowForm }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Productos:</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {productosEnCarrito.map(producto => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{carrito[producto.id]}</td>
                <td>€{producto.precio.toFixed(2)}</td>
                <td>€{(producto.precio * carrito[producto.id]).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h5 className="mt-3">Total: €{totalCost.toFixed(2)}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="modal-button">
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleShowForm} className="modal-button">
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

OrderDetails.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  productosEnCarrito: PropTypes.array.isRequired,
  carrito: PropTypes.object.isRequired,
  totalCost: PropTypes.number.isRequired,
  handleShowForm: PropTypes.func.isRequired,
};

export default OrderDetails;
