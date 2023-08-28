import "./SavedMovies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies() {
  return (
    <main>
      <SearchForm />
      <section className="cardlist">
        <ul className="cardlist__container cardlist__container-type-saved">
          <MoviesCard isSaved={true} />
          <MoviesCard isSaved={true} />
          <MoviesCard isSaved={true} />
        </ul>
      </section>
    </main>
  );
}