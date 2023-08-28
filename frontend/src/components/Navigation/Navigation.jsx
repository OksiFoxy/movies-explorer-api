import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import PopupMenu from "../MobMenu/MobMenu";

function Navigation({ isLanding }) {
  const [isMenuClicked, setIsMenuClicked] = React.useState(false);

  function handleMenuClick() {
    setIsMenuClicked(!isMenuClicked);
  }

  function navBar() {
    if (!isLanding) {
      return (
        <nav className="navigation">
          <Link
            to="/signup"
            className="navigation__link navigation__link-type-register"
          >
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__link navigation__link-button"
          >
            Войти
          </Link>
        </nav>
      );
    } else {
      return (
        <nav className="navigation">
          <Link
            to="/movies"
            className="navigation__link navigation__link-movies nav-dekstop">
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            className="navigation__link navigation__link-movies nav-dekstop">
            Сохранённые фильмы
          </Link>
          <div className="navigation__profile navigation__link-movies nav-dekstop">
            <Link
              to="/profile"
              className="navigation__link navigation__link-movies navigation__link_profile">
              <span>Аккаунт</span>
              <div className="navigation__profile-icon"></div>
            </Link>
          </div>
          <button
            className="navigation__mob-menu-icon"
            type="button"
            onClick={handleMenuClick}
          ></button>
          <PopupMenu isOpen={isMenuClicked} onClose={handleMenuClick} />
        </nav>
      );
    }
  }
  return navBar();
}
export default Navigation;
