import { useLocation, useNavigate, Link } from "react-router-dom";
import { LogOut } from "./LogOut";
import logo from '../assets/storm.png'

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname.includes("/home");

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand">
            <img src={logo} alt="" style={{backgroundColor:"whites", width: '40px', height: '40px', marginRight: '10px' }}/>
            Weather Forecast
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/contact">
                  Contact
                </Link>
              </li>
              {isHome && (
                <li className="nav-item">
                  <Link className="nav-link text-danger">
                    <LogOut />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;