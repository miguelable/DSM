import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { addPedidoToUserComprados } from "../utils/firebase.utils";
import ThankYouModal from "./ThankYouModal";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import paypalConfig from "../utils/paypal.utils";

function ShippingInfo({
  show,
  handleClose,
  carrito,
  productosEnCarrito,
  totalCost,
  limpiarCarrito,
  actualizarUsuario,
}) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setNombre(userData.Nombre);
      setDireccion(userData.Direccion);
      setCiudad(userData.Ciudad);
      setCodigoPostal(userData.CodigoPostal);
      setTelefono(userData.Telefono);
    }
  }, [show]);

  const handleConfirmPedido = async (event) => {
    event.preventDefault();
    // The payment process will be handled by PayPal, so no need to handle it here
  };

  const handlePaymentSuccess = async () => {
    const pedido = {
      Nombre_completo: nombre,
      Direccion: direccion,
      Ciudad: ciudad,
      Codigo_postal: codigoPostal,
      Telefono: telefono,
      Productos: productosEnCarrito.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        cantidad: carrito[producto.id],
        precio_unitario: producto.precio,
        total: producto.precio * carrito[producto.id],
      })),
      Total: totalCost,
    };

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData ? userData.id : null;

      if (userId) {
        await addPedidoToUserComprados(userId, pedido);
      }
      localStorage.removeItem("cart");
      limpiarCarrito();
      actualizarUsuario();
      handleClose();
      setShowThankYouModal(true);
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Error al realizar el pedido. Por favor, intenta nuevamente.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Información de Envío</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleConfirmPedido}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDireccion" className="mt-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCiudad" className="mt-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCodigoPostal" className="mt-3">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu código postal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTelefono" className="mt-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer className="mt-3 justify-content-center border-0 d-block">
              <PayPalScriptProvider
                options={{
                  "client-id": paypalConfig.ClientID,
                  currency: "EUR",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalCost.toString(),
                            currency_code: "EUR",
                          },
                        },
                      ],
                      application_context: {
                        brand_name: "NFT Marketplace",               
                      },
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePaymentSuccess(details);
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Checkout onError", err);
                    alert(
                      "Error en el proceso de pago. Por favor, intenta nuevamente."
                    );
                  }}
                />
              </PayPalScriptProvider>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <ThankYouModal
        show={showThankYouModal}
        handleClose={() => setShowThankYouModal(false)}
      />
    </>
  );
}

ShippingInfo.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  carrito: PropTypes.object.isRequired,
  productosEnCarrito: PropTypes.array.isRequired,
  totalCost: PropTypes.number.isRequired,
  limpiarCarrito: PropTypes.func.isRequired,
  actualizarUsuario: PropTypes.func.isRequired,
};

export default ShippingInfo;
