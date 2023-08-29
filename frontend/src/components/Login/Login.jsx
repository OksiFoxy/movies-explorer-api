import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Login.css";

export default function Login({ onSubmit }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  const handleEmailInput = event => {
    setEmail(event.target.value);
  };

  const handleLogin = event => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <main>
      <section className="auth">
        <Link to="/" className="auth__logo-link">
          <div className="auth__logo"></div>
        </Link>
        <h3 className="auth__title">Рады видеть!</h3>
        <form className="auth__form" onSubmit={handleLogin}>
          <label className="auth__input-label">
            E-mail
          </label>
          <input
            className="auth__input"
            type="email"
            placeholder="Введите e-mail"
            onChange={handleEmailInput}
            autoComplete="on"
            required>
          </input>
          <span className="auth__error"></span>
          <label className="auth__input-label">
            Пароль
          </label>
          <input
            className="auth__input"
            type="password"
            placeholder="Введите пароль"
            onChange={handlePasswordInput}
            required
            autoComplete="off">
          </input>
          <span className="auth__error"></span>
          <button className="auth__submit">Войти</button>
        </form>
        <p className="auth__text">Еще не зарегистрированы?
          <Link to="/signup" className="auth__link">Регистрация</Link>
        </p>
      </section>
    </main>
  );
};