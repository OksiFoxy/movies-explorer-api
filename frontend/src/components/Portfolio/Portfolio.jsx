import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <a
        href="https://github.com/OksiFoxy/russian-travel"
        className="portfolio__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="portfolio__text">Статичный сайт</span>
        <span className="portfolio__icon">↗</span>
      </a>
      <div className="portfolio__line"></div>
      <a
        href="https://github.com/OksiFoxy/1691413-pink-22"
        className="portfolio__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="portfolio__text">Адаптивный сайт-верстка</span>
        <span className="portfolio__icon">↗</span>
      </a>
      <div className="portfolio__line"></div>
      <a
        href="https://github.com/OksiFoxy/react-mesto-api-full-gha"
        className="portfolio__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="portfolio__text">Проект на Реакте</span>
        <span className="portfolio__icon">↗</span>
      </a>
    </section>
  );
}

export default Portfolio;