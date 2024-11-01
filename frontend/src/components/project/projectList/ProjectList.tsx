import ProjectCard from '../../common/projectCard/ProjectCard';
import RunnerWay from '../../../assets/image/RunnerWay.png';
import style from './ProjectList.module.css';
import { useNavigate } from 'react-router-dom';

function ProjectList() {
  const WIP_PJT_LIST = [
    {
      imageSrc: RunnerWay,
      title: 'Runner Way',
      state: true,
      term: '2024.10.03 ~ 2024.11.30',
      summary: '당신의 러닝을 함께하는 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Marathon Prep',
      state: true,
      term: '2024.09.01 ~ 2024.12.01',
      summary: '마라톤을 준비하는 모든 러너들을 위한 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Daily Jogging',
      state: true,
      term: '2024.11.01 ~ 2024.12.31',
      summary: '매일 조깅하는 습관을 길러주는 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Trail Exploration',
      state: true,
      term: '2024.08.15 ~ 2024.11.15',
      summary: '자연 속 트레일을 탐험하며 러닝을 즐기는 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Night Runners',
      state: true,
      term: '2024.10.10 ~ 2024.12.10',
      summary: '야간 러닝을 즐기는 러너들을 위한 프로젝트',
    },
  ];

  const FIN_PJT_LIST = [
    {
      imageSrc: RunnerWay,
      title: 'Endurance Challenge',
      state: false,
      term: '2024.04.01 ~ 2024.06.30',
      summary: '한계를 극복하는 러닝 도전 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Marathon Complete',
      state: false,
      term: '2024.01.01 ~ 2024.03.30',
      summary: '마라톤 완주를 위한 도전 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Summer Sprint',
      state: false,
      term: '2024.06.01 ~ 2024.07.31',
      summary: '여름 동안 짧은 거리 러닝 훈련 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'City Night Run',
      state: false,
      term: '2023.11.05 ~ 2024.01.10',
      summary: '도심에서의 야간 러닝 체험 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Trail Discoveries',
      state: false,
      term: '2024.03.15 ~ 2024.05.15',
      summary: '트레일 러닝으로 새로운 길을 탐험',
    },
    {
      imageSrc: RunnerWay,
      title: 'Weekly 5K Challenge',
      state: false,
      term: '2023.09.01 ~ 2024.01.01',
      summary: '매주 5km 달리기 도전 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Morning Marathoners',
      state: false,
      term: '2024.02.01 ~ 2024.04.01',
      summary: '아침 러닝을 즐기는 사람들을 위한 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Speed Boost',
      state: false,
      term: '2024.08.01 ~ 2024.09.01',
      summary: '단기간 스피드 향상을 목표로 한 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Endurance Build',
      state: false,
      term: '2023.12.01 ~ 2024.02.28',
      summary: '장거리 달리기로 지구력 강화 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Rainy Day Run',
      state: false,
      term: '2024.05.01 ~ 2024.06.30',
      summary: '비 오는 날에도 러닝을 멈추지 않는 프로젝트',
    },
    {
      imageSrc: RunnerWay,
      title: 'Marathon Prep Complete',
      state: false,
      term: '2024.03.01 ~ 2024.05.31',
      summary: '마라톤을 준비하는 모든 러너들의 여정',
    },
    {
      imageSrc: RunnerWay,
      title: 'Park Run Adventures',
      state: false,
      term: '2024.07.01 ~ 2024.09.01',
      summary: '도시 공원을 탐방하며 달리기 즐기기',
    },
  ];

  const navigate = useNavigate();

  const navCreate = () => {
    navigate('/project/create');
  };

  return (
    <div className={style.container}>
      <section className={style.headerSection}>
        <div className={style.head}>프로젝트</div>
        <button className={style.btn} onClick={navCreate}>
          + 프로젝트 추가
        </button>
      </section>

      <section className={style.pjtSec}>
        <div className={style.title}>진행중인 프로젝트</div>
        <div className={style.wips}>
          {WIP_PJT_LIST.map((card, index) => (
            <ProjectCard
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              state={card.state}
              term={card.term}
              summary={card.summary}
            />
          ))}
        </div>
      </section>

      <br />
      <hr className={style.hr} />
      <br />
      <section className={style.pjtSec}>
        <div className={style.title}>종료된 프로젝트</div>
        <div className={style.fins}>
          {FIN_PJT_LIST.map((card, index) => (
            <ProjectCard
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              state={card.state}
              term={card.term}
              summary={card.summary}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProjectList;
