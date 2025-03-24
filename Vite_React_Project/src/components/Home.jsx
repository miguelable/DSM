import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleVerMasClick = () => {
    navigate("/productos");
  };

  const handleIniciarSesionClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <>
      <div className="home-container" data-aos="fade-up">
        <div className="home-content">
          <div className="home-text animate__animated animate__fadeInDown">
            <h1>¡Bienvenido a la tienda de NFTs!</h1>
            <p>
              En nuestra tienda encontrarás una amplia variedad de NFTs para
              coleccionar.
            </p>
            <p>¡No te quedes sin el tuyo!</p>
            <button
              className="btn btn-primary m-0 "
              onClick={handleVerMasClick}
            >
              Ver más
            </button>
          </div>
          <div className="home-image">
            <img src="header-right.png" alt="NFTs" />
          </div>
        </div>
      </div>
      <div className="home-container" data-aos="fade-up">
        <div className="home-content">
          <div className="home-image">
            <img src="header-left.jpg" alt="NFTs" />
          </div>
          <div className="home-text animate__animated animate__fadeInDown">
            <h1>¡Empieza a comprar y a vender tus NFT favoritos!</h1>
            <p>
              Inicia sesión y carga un mundo de posibilidades para tus NFTs.
            </p>
            <p>Marca la diferencia y comienza a vender tus propios NFTs.</p>
            <button
              className="btn btn-primary m-0"
              onClick={handleIniciarSesionClick}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
      <div className="home-container" data-aos="fade-up">
        <div className="home-content">
          <div className="home-text animate__animated animate__fadeInDown">
            <h1>¡Consigue un ingreso extra!</h1>
            <p>
              Conviértete en un vendedor de NFTs y comienza a ganar dinero
              vendiendo los que tu imaginación pueda crear.
            </p>
            <p>Hazlo de forma segura y sencilla utilizando PayPal.</p>
            <p className="highlighted-text">¿Qué esperas?</p>
          </div>
          <div className="home-image">
            <img src="header-right2.jpg" alt="NFTs" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
