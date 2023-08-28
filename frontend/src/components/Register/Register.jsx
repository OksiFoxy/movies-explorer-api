// Register (почти аналогично логину + показать сообщение, что регистрация успешна).
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Register.css";

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInput = event => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  const handleNameInput = event => {
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onRegister(name, email, password);
  };

  return (
    <main>
      <section className="register">
        <Link to="/" className="register__logo-link">
          <div className="register__logo"></div>
        </Link>
        <h3 className="register__title">Добро пожаловать!</h3>
        <form className="register__form" name="register" onSubmit={handleSubmit}>
          <label className="register__input-label">
            Имя
          </label>
          <input
            className="register__input"
            type="Имя"
            placeholder="Введите имя"
            value={name}
            onChange={handleNameInput}
            required />
          <span className="register__error"></span>
          <label className="register__input-label">
            E-mail
          </label>
          <input
            className="register__input"
            type="email"
            placeholder="Введите e-mail"
            value={email}
            onChange={handleEmailInput}
            required>
          </input>
          <span className="register__error"></span>
          <label className="register__input-label">
            Пароль
          </label>
          <input
            className="register__input"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={handlePasswordInput}
            required
          />
          <span className="register__error">Что-то пошло не так...</span>
          <button className="register__submit">Зарегистрироваться</button>
        </form>
        <p className="register__text">Уже зарегистрированы?
          <Link to="/signin" className="register__link">Войти</Link>
        </p>
      </section>
    </main>
  );
};
