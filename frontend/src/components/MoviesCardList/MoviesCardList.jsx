import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  MOVIES_PAGE_WIDE,
  MOVIES_PAGE_STAN,
  MOVIES_PAGE_TAB,
  MOVIES_PAGE_MOB,
  MOVIES_LOAD_WIDE,
  MOVIES_LOAD_STAN,
  MOVIES_LOAD_TAB,
  RES_WIDE,
  RES_STAN,
  RES_TAB,
} from "../../utils/constants";

export default function MoviesCardList({
  movies,
  savedMovies,
  onLoading,
  onErrorServer,
  onNotFound,
  isShowed,
  onSaveMovie,
  userMovies,
  onDeleteMovie,
}) {
  const [isShowMore, setIsShowMore] = React.useState(false);
  const [moviesPerPage, setMoviesPerPage] = React.useState(MOVIES_PAGE_WIDE);
  const [moviesPerLoad, setMoviesPerLoad] = React.useState(MOVIES_LOAD_WIDE);
  const [width, setWidth] = React.useState(window.innerWidth);

  function showMoreMovies() {
    setMoviesPerPage((prevValue) => prevValue + moviesPerLoad);
  }

  function handleResizeWindow() {
    setTimeout(() => {
      setWidth(window.innerWidth);
    }, 1000);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  React.useEffect(() => {
    if (width === RES_WIDE) {
      setMoviesPerPage(MOVIES_PAGE_WIDE);
      setMoviesPerLoad(MOVIES_LOAD_WIDE);
    } else if (width < RES_WIDE && width >= RES_STAN) {
      setMoviesPerPage(MOVIES_PAGE_STAN);
      setMoviesPerLoad(MOVIES_LOAD_STAN);
    } else if (width < RES_STAN && width >= RES_TAB) {
      setMoviesPerPage(MOVIES_PAGE_TAB);
      setMoviesPerLoad(MOVIES_LOAD_TAB);
    } else if (width < RES_TAB) {
      setMoviesPerPage(MOVIES_PAGE_MOB);
      setMoviesPerLoad(MOVIES_LOAD_TAB);
    }
    setWidth(window.innerWidth);
  }, [movies, width]);

  React.useEffect(() => {
    if (movies.length <= moviesPerPage) {
      setIsShowMore(false);
    } else if (movies.length > moviesPerPage && !savedMovies) {
      setIsShowMore(true);
    }
  }, [movies.length, moviesPerPage, savedMovies]);

  if (onLoading) {
    return <Preloader />;
  }

  function handleTypeList() {
    if (!savedMovies) {
      return (
        <section className="cardlist">
          <ul className="cardlist__container">
            <MoviesCard savedMovies={true} />
          </ul>
          <div className="cardlist__loader">
            <button type="button" className="cardlist__loader-btn">Ещё</button>
          </div>
        </section>
      );
    } else {
      return (
        <section className="cardlist">
          <ul className="cardlist__container">
            <MoviesCard savedMovies={true} />
          </ul>
          <div className="cardlist__loader">
            {isShowMore && (
              <button type="button"
                className="cardlist__loader-btn"
                onClick={showMoreMovies}>Ещё
              </button>
            )}
          </div>
        </section>
      );
    }
  }
  return handleTypeList;
}
