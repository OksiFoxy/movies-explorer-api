import React from "react";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { getMovies } from "../../utils/MoviesApi";
import { SHORT_DUR } from "../../utils/constants";

export default function Movies({
  onOpenModal,
  onSaveMovie,
  userMovies,
  onDeleteMovie,
  onFilter,
}) {
const [isShortsChecked, setIsShortsCheked] = React.useState(false);
const [renderMovies, setRenderMovies] = React.useState([]);
const [movies, setMovies] = React.useState([]);
const [isLoading, setIsLoading] = React.useState(false);
const [isServerResponse, setIsServerResponse] = React.useState(true);
const [filteredMovies, setFilteredMovies] = React.useState([]);
const [isMovieCardListShow, setIsMovieCardListShow] = React.useState(false);

function handleSearchMovies(request) {
  localStorage.setItem("request", request);
  localStorage.setItem("shorts", isShortsChecked);
  if (movies.length === 0) {
    setIsMovieCardListShow(true);
    setIsLoading(true);
    getMovies()
      .then((movies) => {
        setMovies(movies);
        setIsServerResponse(true);
        handleFilter(movies, request);
      })
      .catch((err) => {
        console.log(err);
        setIsServerResponse(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  } else {
    handleFilter(movies, request);
  }
}

function handleFilter(arr, request) {
  const filteredMovies = onFilter(arr, request);
  setFilteredMovies(filteredMovies);
  localStorage.setItem("movies", JSON.stringify(filteredMovies));
}

function handleCheckShorts(status) {
  localStorage.setItem("shorts", status);
  setIsShortsCheked(status);
}

React.useEffect(() => {
  if (!isShortsChecked) {
    setRenderMovies(filteredMovies);
  } else {
    const shorts = filteredMovies.filter((movie) => {
      return movie.duration < SHORT_DUR;
    });
    setRenderMovies(shorts);
  }
}, [filteredMovies, isShortsChecked]);

React.useEffect(() => {
  if (localStorage.getItem("movies")) {
    setFilteredMovies(JSON.parse(localStorage.getItem("movies")));
    setIsShortsCheked(localStorage.getItem("shorts") === "true");
    setIsMovieCardListShow(true);
  }
}, []);

  return (
    <main>
      <section className="movies">
        <SearchForm
        onSubmit={handleSearchMovies}
        onShorts={handleCheckShorts}
        />
        <MoviesCardList
        movies={renderMovies}
        onLoading={isLoading}
        isShowed={isMovieCardListShow}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        userMovies={userMovies}
        />
      </section>
    </main>
  );
}
