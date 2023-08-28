import React from "react";
import "./MoviesCard.css";
import photo from "../../images/movie1.png";

export default function MoviesCard({ isSaved }) {

  const [isSavedMovie, setIsSaveMovie] = React.useState(false);

  function handleSaveClick() {
    setIsSaveMovie(!isSavedMovie);
  }
  function handleTypeButton() {
    if (!isSaved) {
      return (
        <li className="card">
          <button
            className={`card__save ${isSavedMovie && "card__saved"}`} type="button"
            onClick={handleSaveClick}>Сохранить
          </button>

          {isSaved && (
            <button className="card__delete" type='button'
              aria-label='Кнопка удаления фильма'
              onClick={handleSaveClick}></button>
          )}
          <img className="card__photo" src={photo} alt="Фото из фильма" />
            <div className="card__info">
              <h2 className="card__title">33 слова о дизайне</h2>
              <span className="card__time">1ч17м</span>
            </div>
        </li>
      );
    } else {
      return (
        <li className="card">
          <button
            className="card__delete" type="button">
          </button>
          <img className="card__photo" src={photo} alt="Фото из фильма" />
            <div className="card__info">
              <h2 className="card__title">33 слова о дизайне</h2>
              <span className="card__time">1ч17м</span>
            </div>
        </li>
      );
    }
  }
  return handleTypeButton()
}