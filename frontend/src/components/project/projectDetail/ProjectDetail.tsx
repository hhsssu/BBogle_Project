import RunnerWay from '../../../assets/image/RunnerWay.png';
import Setting from '../../../assets/image/icon/Setting.svg';
import style from './ProjectDetail.module.css';
import { useState } from 'react';
import DiaryList from '../../diary/diaryList/DiaryList';
import { useNavigate } from 'react-router-dom';

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
    diaryCnt: 32,
  };

  const navigate = useNavigate();

  const [tabIdx, setTabIdx] = useState(0);
  const [sortIdx, setSortIdx] = useState(0);

  const navPjtList = () => {
    navigate('/project');
  };

  const navCreate = () => {
    // navigate('/project/create');
  };

  const changeTab = (idx: number) => {
    setTabIdx(idx);
  };

  const changeSort = (idx: number) => {
    setSortIdx(idx);
  };

  return (
    <div className={style.container}>
      <div className={style.backBtn} onClick={navPjtList}>
        돌아가기
      </div>

      <section className={style.info}>
        <div className={style.infoHeader}>
          <div className={style.pjtTitleContainer}>
            <img className={style.img} src={PROJECT.imageSrc} alt="" />
            <span className={style.title}>{PROJECT.title}</span>
            <div>
              <img className={style.setting} src={Setting} alt="설정" />
              <div
                className={`${style.state} ${PROJECT.state ? style.stateActive : style.stateInActive}`}
              >
                {PROJECT.state ? '진행 중' : '종료'}
              </div>
            </div>
          </div>
          {PROJECT.state ? (
            <button className={style.endBtn}>프로젝트 종료</button>
          ) : (
            ''
          )}
        </div>

        <div className={style.summary}>{PROJECT.summary}</div>
        <div className={style.term}>
          {PROJECT.term} / {PROJECT.teammate} 명
        </div>

        <div className={style.tagList}>
          <span className={style.subTitle}>나의 역할</span>
          {PROJECT.roles.map((role, index) => (
            <div key={index} className={style.tag}>
              {role}
            </div>
          ))}
        </div>

        <div className={style.tagList}>
          <span className={style.subTitle}>사용 기술</span>
          {PROJECT.techs.map((tech, index) => (
            <div key={index} className={style.tag}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section className={style.tabSection}>
        {/* 탭 */}
        <div className={style.tabList}>
          <div
            className={`${style.tab} ${tabIdx === 0 ? style.activeTab : ''}`}
            onClick={() => changeTab(0)}
          >
            개발일지
            <div className={style.diaryCnt}>{PROJECT.diaryCnt}</div>
          </div>
          {PROJECT.state ? (
            ''
          ) : (
            <div
              className={`${style.tab} ${tabIdx === 1 ? style.activeTab : ''}`}
              onClick={() => changeTab(1)}
            >
              회고록
            </div>
          )}
        </div>

        {tabIdx === 0 ? (
          <div className={style.control}>
            <div className={style.sortOptions}>
              <span
                className={`${sortIdx === 0 ? style.sortActive : style.sortInActive}`}
                onClick={() => changeSort(0)}
              >
                최신순
              </span>
              <span
                className={`${sortIdx === 1 ? style.sortActive : style.sortInActive}`}
                onClick={() => changeSort(1)}
              >
                과거순
              </span>
            </div>
            <button className={style.addDiaryBtn} onClick={navCreate}>
              + 개발일지 추가
            </button>
          </div>
        ) : (
          ''
        )}
      </section>

      <section className={style.diarySection}>
        {tabIdx === 0 ? <DiaryList /> : ''}
      </section>
    </div>
  );
}

export default ProjectDetail;
