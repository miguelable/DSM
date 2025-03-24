import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "react-bootstrap";
import { contarProductosComprados } from "../utils/firebase.utils";
import ItemComprado from "./ItemComprado";
import ItemSubido from "./ItemSubido";
import UploadNFT from "./UploadNFT";
import "../styles/MisNFT.css"; // Importar el archivo CSS
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const MisNFT = ({
  usuario,
  productosFirebase,
  actualizarUsuario,
  actualizarProductos,
}) => {
  const [productosCreados, setProductosCreados] = useState([]);
  const [productosComprados, setProductosComprados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const navigate = useNavigate();

  const getUserUid = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        return JSON.parse(atob(token.split(".")[1])).user_id;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
      }
    }
    return null;
  };

  const userUid = getUserUid();

  // Cargar productos creados
  useEffect(() => {
    if (usuario && usuario.Creados) {
      const creadosIds = Object.values(usuario.Creados); // Obtener los IDs de los productos creados
      const creadosProductos = creadosIds
        .map((id) => productosFirebase.find((producto) => producto.id === id))
        .filter((producto) => producto); // Filtrar productos válidos

      setProductosCreados(creadosProductos);
    }
  }, [usuario, productosFirebase]); // Asegúrate de que este efecto dependa de `usuario`

  // Cargar productos comprados
  useEffect(() => {
    if (usuario && usuario.Comprados) {
      setUserLoading(false);
      const productos = contarProductosComprados(usuario.Comprados);
      const compradosProductos = Object.keys(productos)
        .map((id) => {
          const producto = productosFirebase.find((p) => p.id === id);
          if (producto) {
            return { ...producto, cantidad: productos[id] }; // Agregar la cantidad al producto
          }
          return null;
        })
        .filter((producto) => producto); // Filtrar productos válidos

      setProductosComprados(compradosProductos);
    } else {
      setUserLoading(false);
    }
  }, [usuario, productosFirebase]);

  useEffect(() => {
    if (productosFirebase.length > 0) {
      setLoading(false);
    }
  }, [productosFirebase]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleViewProducts = () => {
    navigate("/productos");
  };

  if (userLoading || loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </Container>
    );
  }

  if (!usuario) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center p-4 border rounded shadow-sm bg-light">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size="3x"
            className="mb-3 text-warning"
          />
          <h2>Debes iniciar sesión para ver tus NFT</h2>
          <Button
            onClick={handleLogin}
            className="w-auto mt-3 inicio-button me-3"
            variant="primary"
          >
            Iniciar Sesión
          </Button>
          <Button
            onClick={handleViewProducts}
            className="w-auto mt-3 btn"
            variant="secondary"
          >
            Ver Productos
          </Button>
        </div>
      </Container>
    );
  }

  const noCreados = productosCreados.length === 0;
  const noComprados = productosComprados.length === 0;

  return (
    <>
      <Container className="productos-container mt-4">
        <h2>Mis NFT</h2>
        {noCreados ? (
          <div className="no-products">
            <p>Aún no has cargado ninguna NFT</p>
            <p>¡Puedes subir alguna usando el botón a continuación!</p>
            <div className="button-group">
              <UploadNFT
                userId={userUid}
                actualizarUsuario={actualizarUsuario}
                actualizarProductos={actualizarProductos}
                className="mb-4"
              />
            </div>
          </div>
        ) : (
          <>
            <UploadNFT
              userId={userUid}
              actualizarUsuario={actualizarUsuario}
              actualizarProductos={actualizarProductos}
              className="mb-4"
            />
            <Row>
              {productosCreados.map((producto) => (
                <Col
                  key={producto.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <ItemSubido
                    producto={producto}
                    userId={userUid}
                    actualizarUsuario={actualizarUsuario}
                    actualizarProductos={actualizarProductos}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      <Container className="productos-container mt-4">
        <h2>NFT Comprados</h2>
        {noComprados ? (
          <div className="no-products">
            <p>Aún no has adquirido ninguna NFT</p>
            <p>¡Puedes comprar alguna en la sección de productos!</p>
            <div className="button-group">
              <Button
                onClick={handleViewProducts}
                className="btn w-auto mt-4"
                variant="primary"
              >
                Ver Productos
              </Button>
            </div>
          </div>
        ) : (
          <Row>
            {productosComprados.map((producto) => (
              <Col
                key={producto.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <ItemComprado producto={producto} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

MisNFT.propTypes = {
  usuario: PropTypes.object.isRequired,
  productosFirebase: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
      imagen: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
    })
  ).isRequired,
  actualizarUsuario: PropTypes.func.isRequired,
  actualizarProductos: PropTypes.func.isRequired,
};

export default MisNFT;
