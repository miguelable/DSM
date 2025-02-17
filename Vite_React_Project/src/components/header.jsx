import { Link } from "react-router-dom";

function Header() {
  return (
    <header data-bs-theme="dark">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            RideYourWorld
          </Link>
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
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  id="home_text"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" id="admin_text">
                  Admin
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="language_text"
                >
                  Language
                </Link>
                <ul className="dropdown-menu" aria-labelledby="language_text">
                  <li>
                    <Link className="dropdown-item" to="/" id="spanish_text">
                      Spanish
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/" id="english_text">
                      English
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/" id="french_text">
                      French
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                id="search_input"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                id="search_text"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
