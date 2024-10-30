import RunnerWay from '../../../assets/image/RunnerWay.png';

import style from './ProjectCard.module.css';

function ProjectCard() {
  return (
    <div className={style['pjt-card']}>
      <section className={style['pjt-card-sec-1']}>
        <img className={style['pjt-card-img']} src={RunnerWay} alt="" />
        <div className={style['pjt-card-sec-1-div']}>
          <div className={style['pjt-card-sec-1-div-1']}>
            <span className={style['pjt-card-title']}>title</span>
            <div className={style['pjt-card-state']}>진행 중</div>
          </div>
          <div className={style['pjt-card-term']}>2024.10.03 ~ 2024.11.30</div>
        </div>
      </section>

      <section className={style['pjt-card-sec-2']}>
        <div className={style['pjt-card-summary']}>프로젝트 요약</div>
        <div className={style['pjt-card-bell']}>알림</div>
      </section>
    </div>
  );
}
export default ProjectCard;
