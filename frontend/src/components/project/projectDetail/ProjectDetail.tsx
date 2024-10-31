import { Outlet } from 'react-router-dom';
import RunnerWay from '../../../assets/image/RunnerWay.png';
import setting from '../../../assets/image/icon/setting.svg';
import style from './ProjectDetail.module.css';

function ProjectDetail() {
  const PROJECT = {
    imageSrc: RunnerWay,
    title: 'Runner Way',
    state: true,
    term: '2024.10.03 ~ 2024.11.30',
    summary: '당신의 러닝을 함께하는 프로젝트',
    teammate: 6,
    roles: ['FE', 'BE', 'INFRA', 'AI'],
    techs: ['React', 'Spring', 'TypeScript', 'JPA', 'MongoDB'],
  };

  return (
    <>
      <div>돌아가기</div>

      <section className={style['info']}>
        <div>
          <div>
            <img className={style['img']} src={PROJECT.imageSrc} alt="" />
            <span className={style['title']}>{PROJECT.title}</span>
            <div>
              <img className={style['setting']} src={setting} alt="설정" />
              <div
                className={`${style['state']} ${style[PROJECT.state ? 'stateTrue' : 'stateFalse']}`}
              >
                {PROJECT.state ? '진행 중' : '종료'}
              </div>
            </div>
          </div>
          {PROJECT.state ? (
            <button className={style['btn']}>프로젝트 종료</button>
          ) : (
            ''
          )}
        </div>

        <div className={style['summary']}>{PROJECT.summary}</div>
        <div className={style['term']}>
          {PROJECT.term} / {PROJECT.teammate} 명
        </div>

        <div className={style['tags']}>
          <span className={style['subTitle']}>나의 역할</span>
          {PROJECT.roles.map((role, index) => (
            <div key={index} className={style['tag']}>
              {role}
            </div>
          ))}
        </div>

        <div className={style['tags']}>
          <span className={style['subTitle']}>사용 기술</span>
          {PROJECT.techs.map((tech, index) => (
            <div key={index} className={style['tag']}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section className={style['tabs']}>
        {/* 탭 */}
        <div className={style['tab']}>개발일지</div>
        {PROJECT.state ? '' : <div className={style['tab']}>회고록</div>}
      </section>

      <section>
        <Outlet />
      </section>
    </>
  );
}

export default ProjectDetail;
