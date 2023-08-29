import React from 'react';
import { useState, } from 'react';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import './App.css';
import * as mainApi from "../../utils/MainApi";
import { register, login, checkToken } from "../../utils/apiAuth"
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isServerResponse, setIsServerResponse] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [userMovies, setUserMovies] = useState([]);
  const [popupStatus, setPopupStatus] = useState({ message:'' });
  const navigate = useNavigate();

  function handleRegister({name, email, password}) {
    register({name, email, password})
    .then((res) => {
      if (res._id) {
        console.log(popupStatus.message)
        setPopupStatus({ message: 'Вы успешно зарегистрировались!' });
        handleLogin({email, password});
      }
    })
    .catch(() => {
        setPopupStatus({ message: 'Что-то пошло не так! Попробуйте еще раз' });
      })
      .finally();
  };

  function getUserMovies() {
    mainApi.getUserMovies()
      .then((res) => {
        if (res.data) {
          setUserMovies(res.data);
          setIsServerResponse(true);
        }
      })
      .catch((err) => {
        setIsServerResponse(false);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogin({email, password}) {
    login({email, password})
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        getUserMovies();
          navigate("/movies", { replace: true });
      })
      .catch(() => {
        setPopupStatus({ message: 'Что-то пошло не так! Попробуйте еще раз' });
      });
  };

  function handleEditProfile(name, email) {
    mainApi.editProfile(name, email)
      .then((res) => {
        if (res.data) {
          setCurrentUser(res.data);
          setPopupStatus({ message: 'Данные успешно обновлены' });
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  function handleLogoutUser() {
    mainApi.logoutUser()
      .then((res) => {
        if (res.message) {
          setIsLoggedIn(false);
          localStorage.removeItem('jwt');
          console.log(res.message);
          localStorage.removeItem("user");
          localStorage.removeItem("request");
          localStorage.removeItem("shorts");
          localStorage.removeItem("movies");
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovies(movie)
      .then((res) => {
        if (res.data) {
          setUserMovies([res.data, ...userMovies]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleFilter(arr, request) {
    const result = arr.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(request.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(request.toLowerCase())
      );
    });
    return result;
  }

function handleDeleteMovie(movieId) {
    mainApi.deleteSavedMovie(movieId)
      .then((res) => {
        if (res.data) {
          setUserMovies((movies) => movies.filter((m) => m._id !== res.data._id)
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res.data);
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header 
            loggedIn={isLoggedIn}
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
                  loggedIn={!isLoggedIn}
                />
                <ProtectedRoute
                  component={Movies}
                  loggedIn={isLoggedIn}
                  onSaveMovie={handleSaveMovie}
                  onDeleteMovie={handleDeleteMovie}
                  onFilter={handleFilter}
                  userMovies={userMovies}
                />
                <Footer />
              </>
            }
          />
        <Route exact path='/saved-movies'
            element={
              <>
                <Header
                  loggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  component={SavedMovies}
                  loggedIn={isLoggedIn}
                  userMovies={userMovies}
                  onServerResponse={isServerResponse}
                  onDeleteMovie={handleDeleteMovie}
                  onFilter={handleFilter}
                />
                <Footer />
              </>
            }
          />
        <Route exact path='/profile'
            element={
              <>
                <Header
                  loggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  component={Profile}
                  loggedIn={isLoggedIn}
                  onSubmit={handleEditProfile}
                  onLogout={handleLogoutUser}
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
            onSubmit={handleLogin}
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
