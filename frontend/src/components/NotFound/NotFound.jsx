import "./NotFound.css";

function NotFound() {

  return (
    <main className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__subtitle">Страница не найдена</p>
      <button type="button" className="notfound__back"> Назад </button>
    </main>
  );
}

export default NotFound;