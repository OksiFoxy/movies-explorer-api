import "./Footer.css";

export default function Footer() {
  return (
    <footer className={`footer`}>
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__info">
        <span className="footer__copyright">&copy;2023</span>
        <ul className="footer__links">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/" target="blank">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/" target="blank">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
