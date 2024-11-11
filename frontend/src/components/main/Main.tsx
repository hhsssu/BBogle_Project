import style from './Main.module.css';
import Lottie from 'lottie-react';
import Welcome from '../../assets/lottie/Welcome.json';
import Scroll from '../../assets/lottie/Scroll.json';

// TODO : 임시 이미지
import RunnerWay from '../../assets/image/RunnerWay.png';
import ProjectCard from '../common/projectCard/ProjectCard';
import GoToDiary from '../common/button/GoToDiary';
import useProjectSelectStore from '../../store/useProjectSelectStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HorizontalScroll from '../common/scroll/HorizontalScroll';
import useUserStore from '../../store/useUserStore';

function Main() {
  const { activeProjectId, setActiveProjectId } = useProjectSelectStore();
  const { fetchUserNickname, user } = useUserStore();
  const navigate = useNavigate();
  const [scrollGuide, setScrollGuide] = useState(true);

  useEffect(() => {
    fetchUserNickname();
    setActiveProjectId(null);
    setTimeout(() => {
      setScrollGuide(false);
    }, 5000);
  }, [fetchUserNickname, setActiveProjectId]);

  // 카드 선택
  const handleCard = (id: number) => {
    setActiveProjectId(id);
  };

  const pjtList = [
    {
      id: 0,
      imageSrc: RunnerWay,
      title: 'Runner Way',
      state: true,
      term: '2024.10.03 ~ 2024.11.30',
      summary: '당신의 러닝을 함께하는 프로젝트',
    },
    {
      id: 1,
      imageSrc: RunnerWay,
      title: 'Marathon Prep',
      state: true,
      term: '2024.09.01 ~ 2024.12.01',
      summary: '마라톤을 준비하는 모든 러너들을 위한 프로젝트',
    },
    {
      id: 2,
      imageSrc: RunnerWay,
      title: 'Daily Jogging',
      state: true,
      term: '2024.11.01 ~ 2024.12.31',
      summary: '매일 조깅하는 습관을 길러주는 프로젝트',
    },
    {
      id: 3,
      imageSrc: RunnerWay,
      title: 'Trail Exploration',
      state: true,
      term: '2024.08.15 ~ 2024.11.15',
      summary: '자연 속 트레일을 탐험하며 러닝을 즐기는 프로젝트',
    },
    {
      id: 4,
      imageSrc: RunnerWay,
      title: 'Night Runners',
      state: true,
      term: '2024.10.10 ~ 2024.12.10',
      summary: '야간 러닝을 즐기는 러너들을 위한 프로젝트',
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Lottie
          animationData={Welcome}
          loop={false}
          autoplay={true}
          className={style.welcome}
        />
        <div className={style.greeting}>안녕하세요, {user?.nickname}님!</div>
      </div>
      <div className={style.diary}>
        <div>
          <div className={style.description}>
            <div className={style.mainDescription}>
              오늘의 <span style={{ color: '#FF5C17' }}>성장 기록</span>을
              남겨보세요 :-)
            </div>
            <div className={style.subDescription}>
              개발한 프로젝트를 선택해주세요 !
            </div>
          </div>
          <div
            className={`${style.scrollGuide} ${!scrollGuide ? style.unvisible : ''}`}
          >
            가로로 스크롤해보세요
            <Lottie
              animationData={Scroll}
              loop={false}
              autoplay={true}
              className={style.scroll}
            />
          </div>
        </div>
        <HorizontalScroll
          children={pjtList.map((card, index) => (
            <div
              className={`${style.pjtCard} ${activeProjectId === card.id ? style.active : ''}`}
              onClick={() => handleCard(card.id)}
              key={index}
            >
              <ProjectCard
                pjtId={card.id}
                imageSrc={card.imageSrc}
                title={card.title}
                status={card.state}
                term={card.term}
                description={card.summary}
                notificationStatus={false}
              />
            </div>
          ))}
        ></HorizontalScroll>
        <div className={style.button}>
          <GoToDiary
            isInactive={activeProjectId === null}
            onClick={() => navigate(`/project/${activeProjectId}/diary/create`)}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
