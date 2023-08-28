import './Promo.css';
import NavTab from "../NavTab/NavTab";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h2 className="promo__header">Учебный проект студента факультета Веб-разработки.</h2>
        <NavTab />
      </div>
    </section>
  );
}
