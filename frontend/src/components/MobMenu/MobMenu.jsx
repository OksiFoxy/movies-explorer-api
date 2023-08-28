import "./MobMenu.css";
import { NavLink } from "react-router-dom";

export default function PopupMenu({ isOpen, onClose }) {
  return (

    <section className={`mobile-menu ${isOpen && "mobile-menu_opened"}`}>
      <div className="mobile-menu__slider">
        <div className={`mobile-menu__container ${isOpen && "mobile-menu__container_opened"}`}>
          <button className="mobile-menu__close-btn" onClick={onClose}></button>
          <ul className="mobile-menu__navigation">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? "mobile-menu__link_active" : ""
                  }`
                }
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? "mobile-menu__link_active" : ""
                  }`
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? "mobile-menu__link_active" : ""
                  }`
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="mobile-menu__profile">
            <NavLink to="/profile"
              className={({ isActive }) =>
                `mobile-menu__link mobile-menu__link_type_profile ${isActive ? "mobile-menu__link_active" : ""
                }`
              }>
              Аккаунт
            </NavLink>
            <div className="mobile-menu__profile-icon"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
