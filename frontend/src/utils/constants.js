const BASE_URL = 'https://api.oksifoxy.movie.nomoredomains.xyz/';

const regEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

const regName = /[^a-zа-яё -]/iu;

const SHORT_DUR = 40;

export {
  regEmail,
  regName,
  BASE_URL,
  SHORT_DUR,
};