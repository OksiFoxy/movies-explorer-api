import './Header.css';
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

export default function Header({ isLoggedIn }) {
  return (
      <header
        className={`header 
        ${!isLoggedIn ? "header_theme_pink" : "header_theme_light"}`}>
        <Link to="/" className="header__logo-link">
          <div className="header__logo"></div>
        </Link>
        <Navigation isLoggedIn={isLoggedIn} />
      </header>
  );
}
