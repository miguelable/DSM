import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Form } from "react-bootstrap";
import Item from "./Item";
import "../styles/Productos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importar correctamente FontAwesomeIcon
import { faShoppingCart, faSpinner } from "@fortawesome/free-solid-svg-icons"; // Importar faShoppingCart desde free-solid-icons
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirección

function Productos({
  productosFirebase,
  agregarAlCarrito,
  eliminarDelCarrito,
  carrito,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    if (productosFirebase.length > 0) {
      setLoading(false);
    }
  }, [productosFirebase]);

  // Inicializar AOS
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProductos = productosFirebase
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.precio - b.precio;
      } else if (sortOrder === "desc") {
        return b.precio - a.precio;
      } else {
        return 0;
      }
    });

  const totalItems = Object.values(carrito).reduce(
    (acc, cantidad) => acc + cantidad,
    0
  ); // Calcular total de ítems correctamente

  if (loading) {
    return (
      <Container
        className="productos d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </Container>
    );
  }

  return (
    <Container className="productos mt-4">
      <Form.Group controlId="search" className="mb-4 d-flex">
        <Form.Control
          type="text"
          placeholder="Buscar productos por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input me-2"
        />
        <Form.Control
          as="select"
          value={sortOrder}
          onChange={handleSortChange}
          className="sort-select"
          style={{ width: "200px" }}
        >
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor a Mayor</option>
          <option value="desc">Mayor a Menor</option>
        </Form.Control>
      </Form.Group>
      <h2>Productos disponibles:</h2>
      <Row>
        {filteredProductos.map((producto) => (
          <div
            key={producto.id}
            data-aos="fade-up" // AOS animation
            className="col-md-4 mb-4 "
          >
            <Item
              className="item-container"
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
              eliminarDelCarrito={eliminarDelCarrito}
              carrito={carrito}
            />
          </div>
        ))}
      </Row>

      {/* Botón flotante */}
      <button
        className="floating-cart-button"
        onClick={() => navigate("/carrito")} // Redirigir a la página de carrito
      >
        <FontAwesomeIcon icon={faShoppingCart} size="lg" color="#ffffff" />
        <span className="cart-count">{totalItems}</span>
      </button>
    </Container>
  );
}

Productos.propTypes = {
  productosFirebase: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
    })
  ).isRequired,
  agregarAlCarrito: PropTypes.func.isRequired,
  eliminarDelCarrito: PropTypes.func.isRequired,
  carrito: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cantidad: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Productos;
