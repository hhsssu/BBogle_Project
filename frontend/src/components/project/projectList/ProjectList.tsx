import ProjectCard from '../../common/projectCard/ProjectCard';
import style from './ProjectList.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProjectStore from '../../../store/useProjectStore';

import EmptyFolder from '../../../assets/image/icon/EmptyFolder.svg';

function ProjectList() {
  const [onlyProgress, setOnlyProgress] = useState(false);

  const PJT_LIST = useProjectStore((state) => state.projectList);
  const getProjectList = useProjectStore((state) => state.getProjectList);
  // [
  //   {
  //     id: 10,
  //     imageSrc: RunnerWay,
  //     title: 'Endurance Challenge',
  //     state: true,
  //     term: '2024.04.01 ~ 2024.06.30',
  //     summary: '한계를 극복하는 러닝 도전 프로젝트',
  //   },
  //   {
  //     id: 11,
  //     imageSrc: RunnerWay,
  //     title: 'Marathon Complete',
  //     state: false,
  //     term: '2024.01.01 ~ 2024.03.30',
  //     summary: '마라톤 완주를 위한 도전 프로젝트',
  //   },
  //   {
  //     id: 12,
  //     imageSrc: RunnerWay,
  //     title: 'Summer Sprint',
  //     state: false,
  //     term: '2024.06.01 ~ 2024.07.31',
  //     summary: '여름 동안 짧은 거리 러닝 훈련 프로젝트',
  //   },
  //   {
  //     id: 13,
  //     imageSrc: RunnerWay,
  //     title: 'City Night Run',
  //     state: false,
  //     term: '2023.11.05 ~ 2024.01.10',
  //     summary: '도심에서의 야간 러닝 체험 프로젝트',
  //   },
  //   {
  //     id: 14,
  //     imageSrc: RunnerWay,
  //     title: 'Trail Discoveries',
  //     state: false,
  //     term: '2024.03.15 ~ 2024.05.15',
  //     summary: '트레일 러닝으로 새로운 길을 탐험',
  //   },
  //   {
  //     id: 15,
  //     imageSrc: RunnerWay,
  //     title: 'Weekly 5K Challenge',
  //     state: false,
  //     term: '2023.09.01 ~ 2024.01.01',
  //     summary: '매주 5km 달리기 도전 프로젝트',
  //   },
  //   {
  //     id: 16,
  //     imageSrc: RunnerWay,
  //     title: 'Morning Marathoners',
  //     state: false,
  //     term: '2024.02.01 ~ 2024.04.01',
  //     summary: '아침 러닝을 즐기는 사람들을 위한 프로젝트',
  //   },
  //   {
  //     id: 17,
  //     imageSrc: RunnerWay,
  //     title: 'Speed Boost',
  //     state: false,
  //     term: '2024.08.01 ~ 2024.09.01',
  //     summary: '단기간 스피드 향상을 목표로 한 프로젝트',
  //   },
  //   {
  //     id: 18,
  //     imageSrc: RunnerWay,
  //     title: 'Endurance Build',
  //     state: false,
  //     term: '2023.12.01 ~ 2024.02.28',
  //     summary: '장거리 달리기로 지구력 강화 프로젝트',
  //   },
  //   {
  //     id: 19,
  //     imageSrc: RunnerWay,
  //     title: 'Rainy Day Run',
  //     state: false,
  //     term: '2024.05.01 ~ 2024.06.30',
  //     summary: '비 오는 날에도 러닝을 멈추지 않는 프로젝트',
  //   },
  //   {
  //     id: 20,
  //     imageSrc: RunnerWay,
  //     title: 'Marathon Prep Complete',
  //     state: false,
  //     term: '2024.03.01 ~ 2024.05.31',
  //     summary: '마라톤을 준비하는 모든 러너들의 여정',
  //   },
  //   {
  //     id: 21,
  //     imageSrc: RunnerWay,
  //     title: 'Park Run Adventures',
  //     state: false,
  //     term: '2024.07.01 ~ 2024.09.01',
  //     summary: '도시 공원을 탐방하며 달리기 즐기기',
  //   },
  // ];

  const navigate = useNavigate();

  const navCreate = () => {
    navigate('/project/create');
  };

  const navPjtDetail = (pjtID: number) => {
    navigate(`${pjtID}`);
  };

  const handleProgress = () => {
    setOnlyProgress(!onlyProgress);
  };

  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <div className={style.container}>
      <section className={style.headerSection}>
        <div className={style.pageTitle}>프로젝트</div>
        <button className={style.addPjtBtn} onClick={navCreate}>
          + 프로젝트 추가
        </button>
      </section>

      <section className={style.pjtSection}>
        <div
          className={`${style.checkProgress} ${onlyProgress ? style.active : ''}`}
          onClick={handleProgress}
        >
          {onlyProgress ? '전체보기' : '진행중인 것만 보기'}
        </div>
        {PJT_LIST.length !== 0 ? (
          <div className={style.fins}>
            {onlyProgress
              ? PJT_LIST.filter((pjt) => pjt.state).map((card, index) => (
                  <div onClick={() => navPjtDetail(card.id)}>
                    <ProjectCard
                      key={index}
                      pjtId={card.id}
                      imageSrc={card.imageSrc}
                      title={card.title}
                      state={card.state}
                      term={card.term}
                      summary={card.summary}
                    />
                  </div>
                ))
              : PJT_LIST.map((card, index) => (
                  <div onClick={() => navPjtDetail(card.id)}>
                    <ProjectCard
                      key={index}
                      pjtId={card.id}
                      imageSrc={card.imageSrc}
                      title={card.title}
                      state={card.state}
                      term={card.term}
                      summary={card.summary}
                    />
                  </div>
                ))}
          </div>
        ) : (
          <div className={style.emptyPjtContainer}>
            <img
              className={style.emptyFolder}
              src={EmptyFolder}
              alt="프로젝트 없음"
            />
            <div className={style.emptyTextBox}>
              <p>프로젝트가 없어요.</p>
              <p className={style.boldText}>프로젝트를 생성해주세요!</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectList;
