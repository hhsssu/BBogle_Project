import ProjectCard from '../common/projectCard/ProjectCard';
import style from './Project.module.css';

function ProjectList() {
  return (
    <>
      <section className={style['pjt-list-head']}>
        <div className={style['pjt-title']}>프로젝트</div>
        <button className={style['pjt-btn']}>+ 프로젝트 추가</button>
      </section>

      <section className={style['pjt-wip-list']}>
        <div className={style['pjt-wip-title']}>진행중인 프로젝트</div>
        <ProjectCard />
      </section>
      <br />
      <hr />
      <br />
      <section className={style['pjt-fin-list']}>
        <div className={style['pjt-fin-title']}>종료된 프로젝트</div>
        <ProjectCard />
      </section>
    </>
  );
}

export default ProjectList;
