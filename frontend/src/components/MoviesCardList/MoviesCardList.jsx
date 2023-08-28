import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ isMob, isTab, savedMovies }) {
  return (
    <section className="cardlist">
      <ul className="cardlist__container">
        <MoviesCard savedMovies={true} isTab={isTab} isMob={isMob} />
        <MoviesCard savedMovies={true} isTab={isTab} isMob={isMob} />
        <MoviesCard savedMovies={true} isTab={isTab} isMob={isMob} />
        <MoviesCard isTab={isTab} isMob={isMob} />
        <MoviesCard isTab={isTab} />
        <MoviesCard isTab={isTab} />
        <MoviesCard isTab={isTab} />
        <MoviesCard isTab={isTab} />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <div className="cardlist__loader">
        <button type="button" className="cardlist__loader-btn">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;