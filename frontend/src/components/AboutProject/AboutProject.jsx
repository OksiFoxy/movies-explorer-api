import './AboutProject.css'

function AboutProject() {
	return (
		<section className="about-project" id="project">
			<h2 className="about-project__title">О проекте</h2>
			<div className="about-project__container">
				<div className="about-project__collumn">
					<h3 className="about-project__collumn-title">Дипломный проект включал 5 этапов</h3>
					<p className="about-project__collumn-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
				</div>
				<div className="about-project__collumn">
					<h3 className="about-project__collumn-title">На выполнение диплома ушло 5 недель</h3>
					<p className="about-project__collumn-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
				</div>
			</div>
			<div className="about-project__time">
				<div className="about-project__time-backend">
					<p className="about-project__week-item about-project__time-backend-week">1 неделя</p>
					<p className="about-project__week-item about-project__week-description">Back-end</p>
				</div>
				<div className="about-project__time-frontend">
					<p className="about-project__week-item about-project__time-frontend-week">4 недели</p>
					<p className="about-project__week-item about-project__week-description">Front-end</p>
				</div>
			</div>
		</section>
	);
}

export default AboutProject;