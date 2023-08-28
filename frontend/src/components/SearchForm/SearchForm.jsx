import React from "react";
import "./SearchForm.css";

export default function SearchForm({ onSubmit, onError, onShorts, savedMovies }) {
  const [value, setValue] = React.useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (value) {
      onSubmit(value);

    } else {
      onError("Нужно ввести ключевое слово");
    }
  }

  React.useEffect(() => {
    if (!savedMovies && localStorage.getItem("request")) {
      setValue(localStorage.getItem("request"));
    }
  }, [savedMovies])

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSearchSubmit}>
        <span className="searchform__form_icon"></span>
        <div className="searchform__form_input-container">
          <input
            type="text"
            className="searchform__input"
            placeholder="Фильм"
            name="search"
            value={value}
            maxLength="40"
            onChange={handleChange}
            required
          />
          <span className="searchform__error">Что то не так</span>
          <button type="submit" className="searchform__submit">
            Найти
          </button>
        </div>
        <div className="searchform__vertline"></div>
        <div className="searchform__switch">
          <div>
            <label className="searchform__switch_checkbox">
              <input
                className="searchform__switch_input"
                type="checkbox"
                onChange={onShorts}
                savedMovies={savedMovies}
              />
              <span className="searchform__switch_slider"></span>
            </label>
          </div>
          <span className="searchform__switch-text">Короткометражки</span>
        </div>
      </form>
      <div className="searchform__line"></div>
    </section>
  );
}

