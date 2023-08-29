import React from "react";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { getMovies } from "../../utils/MoviesApi";
import { CUT_DUR } from "../../utils/constants";

function Movies({userMovies, onFilter, onSaveMovie, onDeleteMovie,}) {
  const [isShortsChecked, setIsShortsCheked] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [renderMovies, setRenderMovies] = React.useState([]);
  const [isServerResponse, setIsServerResponse] = React.useState(true);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMoviesFound, setIsMoviesFound] = React.useState(true);
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
    handleNotFoundMessage(filteredMovies);
    localStorage.setItem("movies", JSON.stringify(filteredMovies));
  }

  function handleNotFoundMessage(result) {
    if (result.length === 0) {
      setIsMoviesFound(false);
    } else {
      setIsMoviesFound(true);
    }
  }

  function handleCheckShorts(status) {
    localStorage.setItem("shorts", status);
    setIsShortsCheked(status);
  }

  React.useEffect(() => {
    if (!isShortsChecked) {
      setRenderMovies(filteredMovies);
      handleNotFoundMessage(filteredMovies);
    } else {
      const shorts = filteredMovies.filter((movie) => {
        return movie.duration < CUT_DUR;
      });
      setRenderMovies(shorts);
      handleNotFoundMessage(shorts);
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
        onErrorServer={isServerResponse}
        onNotFound={isMoviesFound}
        isShowed={isMovieCardListShow}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        userMovies={userMovies}
        />
      </section>
    </main>
  );
}

export default Movies;