import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import api from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { signUp, signIn, checkToken } from '../../utils/apiAuth';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const [isLanding, setisLanding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movie, setMovie] = useState([]);
  const [emailValue, setEmailValue] = useState(null);
  const [popupStatus, setPopupStatus] = useState({ image:'', message:'' });
  const [infoTooltip, setInfoTooltip] = useState(false);
  const navigate = useNavigate();

  function handleRegister(name, email, password) {
    signUp(name, email, password)
      .then(() => {
        console.log(popupStatus.message)
        setPopupStatus({ message: 'Вы успешно зарегистрировались!' });
        handleInfoTooltip(true);
        navigate("/signin");
      })
      .catch(() => {
        setPopupStatus({ message: 'Что-то пошло не так! Попробуйте еще раз' });
      })
      .finally(handleInfoTooltip);
  };

  function handleLogin(email, password) {
    signIn(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setEmailValue(email);
        navigate("/");
      })
      .catch(() => {
        setPopupStatus({ message: 'Что-то пошло не так! Попробуйте еще раз' });
        handleInfoTooltip(true);
      });
  };

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmailValue(null);
    navigate("/signin");
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailValue(res.data.email);
            navigate('/');
          }
        })
        .catch((err) => {
        console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialMovies()])
        .then(([profileInfo, movie]) => {
          setCurrentUser(profileInfo);
          setMovie(movie);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }, [isLoggedIn])

  function handleMovieClick(movie) {
    setSelectedMovie(movie);
  }

  function handleMovieLike(movie) {
    const isLiked = movie.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.addMovieLike(movie._id).then((newMovie) => {
        setMovie((state) => state.map((m) => (m._id === movie._id ? newMovie : m)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteMovieLike(movie._id).then((newMovie) => {
        setMovie((state) => state.map((m) => (m._id === movie._id ? newMovie : m)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }
  function handleUpdateUser(data) {
    setLoading(true);
    api.setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false)
      });
  }

  function handleMovieDelete (movie) {
    api.deleteMovie(movie._id)
      .then(() => {
        setMovie((items) => items.filter((m) => m._id !== movie._id && m));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header 
            isLanding={isLanding} 
            />
            <Main
            loggedIn={isLoggedIn}

            />
            <Footer 

            />
          </>
        }
        />
        <Route exact path='/movies'
            element={
              <>
                <Header
                  isLanding={!isLanding}
                  // loggedIn={isLoggedIn}
                  logOut={handleLogOut}
                />
                <ProtectedRoute
                  component={Movies}
                  // loggedIn={isLoggedIn}
                />
                <Footer />
              </>
            }
          />
        <Route exact path='/saved-movies'
            element={
              <>
                <Header
                  isLanding={!isLanding}
                  loggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  component={SavedMovies}
                  loggedIn={isLoggedIn}
                  element={SavedMovies}
                />
                <Footer />
              </>
            }
          />
        <Route exact path='/profile'
            element={
              <>
                <Header
                  isLanding={!isLanding}
                  loggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  component={Profile}
                  loggedIn={isLoggedIn}
                  onSubmit={handleUpdateUser}
                  onLogout={handleLogOut}
                />
              </>
            }
          />
        <Route path="/signup" 
          element={
            <Register
            onSubmit={handleRegister}
            />
          }
        />
        <Route path="/signin" 
          element={
            <Login
            onLogin={handleLogin}
            onRegister={handleRegister}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
