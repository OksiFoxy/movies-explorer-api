import "./AboutMe.css";
import foto from "../../images/oksana.jpeg";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line"></div>
      <div className="about-me__info-container">
        <div className="about-me__info">
          <div className="about-me__info-text">
            <h3 className="about-me__info-name">Оксана</h3>
            <p className="about-me__info-subtitle">Фронтенд-разработчик, 33 года</p>
            <p className="about-me__info-story">
              Я Оксана, родилась и почти всю жизнь жила в городе Новосибирск
              и 3 года назад переехала в Москву. Я Оксана, родилась и почти всю жизнь жила в городе Новосибирск
              и 3 года назад переехала в Москву. Я Оксана, родилась и почти всю жизнь жила в городе Новосибирск
              и 3 года назад переехала в Москву.
            </p>
          </div>
          <ul className="about-me__links">
            <li>
              <a
                href="https://github.com/OksiFoxy"
                className="about-me__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://t.me/oksi_ai"
                className="about-me__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about-me__info-foto"
          alt="Фотография Оксаны"
          src={foto}
        />
      </div>
    </section>
  );
}

export default AboutMe;