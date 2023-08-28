export const getMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: "GET",
  })
  .then((res) => checkResponse(res));
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}