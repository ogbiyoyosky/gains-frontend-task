import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Header.css'

function Header(props) {

  const logoutUser = () => {
    localStorage.removeItem("Gain-Token")
    props.history.push('/')
  }
  return (
    <nav className="Header navbar navbar-expand-lg navbar-dark c-bg">
      <div className="container">
        <span className="navbar-brand text-white font-weight-bold">
          Gains Frontend
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/auth/dashboard" className="nav-link">
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <div className="text-white c-logout" onClick={() => logoutUser()}>Logout</div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Header);
