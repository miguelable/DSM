import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Productos from "./components/Productos";
import Carrito from "./components/Carrito";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Contacto from "./components/Contacto";
import Usuario from "./components/Usuario";
import MisNFT from "./components/misNFT.jsx";
import { getProductos, getUserData } from "./utils/firebase.utils";

function App() {
  const [productosFirebase, setproductosFirebase] = useState([]);
  const [carrito, setCarrito] = useState({});
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosArray = await getProductos();
      setproductosFirebase(productosArray);
    };

    fetchProductos().catch((error) => {
      console.error("Error fetching data: ", error);
    });

    // Obtener datos del usuario autenticado
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const userId = JSON.parse(atob(token.split(".")[1])).user_id;
        const userData = await getUserData(userId);
        setUsuario(userData);
      }
    };

    fetchUserData().catch((error) => {
      console.error("Error fetching user data: ", error);
    });
  }, []);

  const actualizarUsuario = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const userId = JSON.parse(atob(token.split(".")[1])).user_id;
      const userData = await getUserData(userId);
      setUsuario(userData);
    }
  };

  const actualizarProductos = async () => {
    try {
      const productosArray = await getProductos();
      setproductosFirebase(productosArray);
    } catch (error) {
      console.error("Error al actualizar los productos:", error);
    }
  };

  const agregarAlCarrito = (productoId) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = { ...prevCarrito };
      nuevoCarrito[productoId] = (nuevoCarrito[productoId] || 0) + 1;
      return nuevoCarrito;
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = { ...prevCarrito };
      if (nuevoCarrito[productoId] > 1) {
        nuevoCarrito[productoId] -= 1;
      } else {
        delete nuevoCarrito[productoId];
      }
      return nuevoCarrito;
    });
  };

  const eliminarProductoDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = { ...prevCarrito };
      delete nuevoCarrito[productoId];
      return nuevoCarrito;
    });
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  return (
    <>
      <Header carrito={carrito} usuario={usuario} />
      <Routes className="content">
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login setUsuario={setUsuario} />} />
        <Route
          path="/mis-nfts"
          element={
            <MisNFT
              usuario={usuario}
              productosFirebase={productosFirebase}
              actualizarUsuario={actualizarUsuario}
              actualizarProductos={actualizarProductos}
            />
          }
        />
        <Route
          path="/registro"
          element={<Registro setUsuario={setUsuario} />}
        />
        <Route path="/contacto" element={<Contacto usuario={usuario}/>} />
        <Route
          path="/productos"
          element={
            <Productos
              productosFirebase={productosFirebase}
              agregarAlCarrito={agregarAlCarrito}
              eliminarDelCarrito={eliminarDelCarrito}
              carrito={carrito}
            />
          }
        />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              productosFirebase={productosFirebase}
              agregarAlCarrito={agregarAlCarrito}
              eliminarDelCarrito={eliminarDelCarrito}
              eliminarProductoDelCarrito={eliminarProductoDelCarrito}
              limpiarCarrito={() => setCarrito({})}
              actualizarUsuario={actualizarUsuario}
            />
          }
        />
        <Route
          path="/usuario"
          element={<Usuario usuario={usuario} onLogout={handleLogout} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
