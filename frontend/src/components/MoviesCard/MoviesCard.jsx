import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({ movie, savedMovies, onSaveMovie, userMovies, onDeleteMovie,}) {

  const [isSavedPress, setIsSavedPress] = React.useState(false);

  function handleSaveClick() {
    if (isSavedPress) {
      const savedMovie = userMovies.find((saved) => {
        return saved.movieId === movie.id;
      });
      onDeleteMovie(savedMovie._id);
      setIsSavedPress(!isSavedPress);
    } else {
      onSaveMovie(movie);
      setIsSavedPress(!isSavedPress);
    }
  }

  function handleDeleteClick() {
    onDeleteMovie(movie._id);
  }

  React.useEffect(() => {
    if (!savedMovies) {
      const hasMovieSaved = userMovies.some((saved) => {
        return saved.movieId === movie.id;
      });
      if (hasMovieSaved) {
        setIsSavedPress(true);
      } else {
        setIsSavedPress(false);
      }
    }
  }, [userMovies, movie, savedMovies]);

  function convertTime(dur) {
    const hours = (dur - min) / 60;
    const min = dur % 60;
    return `${hours.toString()}ч${min < 10 ? "0" : ""}${min.toString()} `;
  }

  function handleTypeButton() {
    if (!savedMovies) {
      return (
        <li className="card">
          <button
            className={`card__save ${isSavedPress && "card__saved"}`} type="button"
            onClick={handleSaveClick}>Сохранить
          </button>
          {savedMovies && (
            <button className="card__delete" type='button'
              aria-label='Кнопка удаления фильма'
              onClick={handleDeleteClick}></button>
          )}
          <img className="card__photo" src={savedMovies
            ? movie.image
            : `https://api.nomoreparties.co${movie.image.url}`}
            alt={movie.nameRU} />
          <div className="card__info">
            <h2 className="card__title">{movie.nameRU}</h2>
            <span className="card__time">{convertTime(movie.duration)}</span>
          </div>
        </li>
      );
    } else {
      return (
        <li className="card">
          <button
            className="card__delete" type="button">
          </button>
          <img className="card__photo" src={savedMovies
            ? movie.image
            : `https://api.nomoreparties.co${movie.image.url}`}
            alt={movie.nameRU} />
          <div className="card__info">
            <h2 className="card__title">{movie.nameRU}</h2>
            <span className="card__time">{convertTime(movie.duration)}</span>
          </div>
        </li>
      );
    }
  }
  return handleTypeButton()
}
