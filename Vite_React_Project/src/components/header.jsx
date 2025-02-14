function Header() {
  return (
    <header data-bs-theme="dark">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            RideYourWorld
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  id="home_text"
                >
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" id="admin_text">
                  Administración
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="language_text"
                >
                  Idiomas
                </a>
                <ul className="dropdown-menu" aria-labelledby="language_text">
                  <li>
                    <a className="dropdown-item" href="#" id="spanish_text">
                      Español
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" id="english_text">
                      Inglés
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" id="french_text">
                      Francés
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
                id="search_input"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                id="search_text"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
