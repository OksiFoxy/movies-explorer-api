class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo = () => {
    const requestUrl = this._baseUrl + '/users/me';
    return fetch(requestUrl, {
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  getInitialMovies = () => {
    const requestUrl = this._baseUrl + '/movies';
    return fetch(requestUrl, {
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  getDataFromServer = () => {
    return Promise.all([this.getInitialMovies(), this.getUserInfo()]);
  }

  setUserInfo = (email, name) => {
    const requestUrl = this._baseUrl + '/users/me';
    return fetch(requestUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    })
      .then(this._checkResponse);
  }

  getSavedMovies = () => {
    const requestUrl = this._baseUrl + '/movies';
    return fetch(requestUrl, {
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  saveMovies = (movie) => {
    const requestUrl = this._baseUrl + `/movies/`;
    return fetch(requestUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: String(movie.movieId),
      })
    })
      .then(this._checkResponse);
  }

  deleteMovie = (movieId) => {
    const requestUrl = this._baseUrl + `/movies/${movieId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: `https://api.oksifoxy.movie.nomoredomains.xyz/`,
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    'Content-Type': 'application/json'
  }
});

export default api;