// import {BASE_URL} from './constants';
const BASE_URL ='http://api.oksifoxy.movie.nomoredomains.xyz';

export const editProfile = ({name, email}) => {
  const requestUrl = BASE_URL + '/users/me';
  return fetch(requestUrl, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    },
    body: JSON.stringify({name,email,}),
    })
    .then((res) => checkResponse(res));
};

export const saveMovies = (movie) => {
  const requestUrl = BASE_URL + '/movies/';
  return fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailer: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    }),
  }).then((res) => checkResponse(res));
};

export const getUserMovies = () => {
  const requestUrl = BASE_URL + '/movies/';
  return fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    },
  }).then((res) => checkResponse(res));
};

export const deleteSavedMovie = (movieId) => {
  const requestUrl = BASE_URL + `/movies/${movieId}`;
  return fetch(requestUrl, {
    method: "DELETE",
  }).then((res) => checkResponse(res));
};

export const logoutUser = () => {
  const requestUrl = BASE_URL + '/signout';
  return fetch(requestUrl, {
    method: "POST",
    credentials: "include",
  }).then((res) => checkResponse(res));
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => {
    throw JSON.parse(text).message || JSON.parse(text).error;
  });
}