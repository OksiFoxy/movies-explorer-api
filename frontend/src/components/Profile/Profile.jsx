import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import { Link } from 'react-router-dom';

function Profile ({ isOpen, onSubmit, onLogout, isLoading, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name: name, email: email });
  }

  return (
    <main>
    <section className="profile">
      <h3 className="profile__title">Привет, {currentUser.name}!</h3>
      <form className="profile__form"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      >
        <div className="profile__input_container">
          <label className="profile__input-label">
            Имя
          </label>
          <input
            id="profile-name"
            className="profile__input"
            type="text"
            pattern="[a-zA-ZА-Яа-яЁё\s\-]+"
            value={name}
            onChange={handleNameChange}
            placeholder="Имя"
            name="name"
            minLength="2"
            maxLength="30"
            required
          />
        </div>
        <div className="profile__line"></div>
        <div className="profile__input_container">
          <label className="profile__input-label">
            E-mail
          </label>
          <input
            type="email"
            className="profile__input"
            placeholder="email"
            minLength="2"
            maxLength="30"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button className="profile__submit">Редактировать</button>
      </form>
      <Link to="/" className="profile__logout_btn">Выйти из аккаунта</Link>
    </section>
    </main>
  );
}

export default Profile;