import React from "react";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import { CUT_DUR } from "../../utils/constants";

export default function SavedMovies({
  onOpenModal,
  userMovies,
  onServerResponse,
  onDeleteMovie,
  onFilter,
}) {
  const [isSavedMovies, setIsSavedMovies] = React.useState(false);
  const [renderMovies, setRenderMovies] = React.useState([]);
  const [isShortsChecked, setIsShortsCheked] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isSearched, setIsSearched] = React.useState(false);

  function handleSearchUserMovies(request) {
    const filteredMovies = onFilter(userMovies, request);
    setFilteredMovies(filteredMovies);
    setIsSearched(true);
  }

  function handleCheckShorts(status) {
    setIsShortsCheked(status);
  }

  function handleDeleteMovie(movieId) {
    onDeleteMovie(movieId);
    setFilteredMovies((movies) => movies.filter((m) => m._id !== movieId));
  }

  React.useEffect(() => {
    if (renderMovies.length !== 0) {
      setIsSavedMovies(false);
    } else {
      setIsSavedMovies(true);
    }
  }, [renderMovies]);

  React.useEffect(() => {
    if (!isSearched && !isShortsChecked && filteredMovies.length === 0) {
      setRenderMovies(userMovies);
    } else if (!isSearched && isShortsChecked && filteredMovies.length === 0) {
      const shorts = userMovies.filter((movie) => {
        return movie.duration < CUT_DUR;
      });
      setRenderMovies(shorts);
    } else if (isSearched && !isShortsChecked && filteredMovies.length !== 0) {
      setRenderMovies(filteredMovies);
    } else if (isSearched && isShortsChecked && filteredMovies.length !== 0) {
      const shorts = filteredMovies.filter((movie) => {
        return movie.duration < CUT_DUR;
      });
      setRenderMovies(shorts);
    } else {
      setRenderMovies(filteredMovies);
    }
  }, [userMovies, isSearched, isShortsChecked, filteredMovies]);
  return (
    <main>
      <SearchForm 
      savedMovies={true}
      onSubmit={handleSearchUserMovies}
      onError={onOpenModal}
      onShorts={handleCheckShorts}
      />
      <MoviesCardList
      savedMovies={true}
      movies={renderMovies}
      onErrorServer={onServerResponse}
      onNotFound={!isSavedMovies}
      isShowed={true}
      onDeleteMovie={handleDeleteMovie}
      />
    </main>
  );
}