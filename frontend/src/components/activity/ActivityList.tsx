import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import useActivityStore from '../../store/useActivityStore';

import ActivityCard from './ActivityCard';
import ActivityStyles from './Activity.module.css';

import SearchIcon from '../../assets/image/icon/Search.svg';
import EmptyFolder from '../../assets/image/icon/EmptyFolder.svg';
import ActivitySearchModal from './activitySearch/ActivitySearchModal';
// import useProjectStore from '../../store/useProjectStore';

function ActivityList() {
  const nav = useNavigate();
  // const { activities, fetchActivities } = useActivityStore();
  // const {project, fetchProject} = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);

  // 경험 수동 생성으로 이동
  const navActivityCreate = () => {
    nav('create');
  };

  // 경험
  // useEffect(() => {
  //   fetchActivities();
  //   console.log(`activities: `, activities);
  // }, []);

  // 검색 모달
  const handleOpenSearchModal = () => setIsOpen(true);
  const handleCloseSearchModal = () => setIsOpen(false);

  // 더미 데이터 예시
  const activities = [
    {
      activityId: 1,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      projectTitle: 'RunnerWay',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 2,
      title: '카카오 API를 이용한 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      projectTitle: 'WON TOUCH!',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 3,
      title: '20자20자20자를채워보자20자20자',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      projectTitle: 'RunnerWay',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 4,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      projectTitle: 'Challet',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 5,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      projectTitle: 'RunnerWay',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 6,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      projectTitle: 'WON TOUCH!',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 7,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      projectTitle: 'Challet',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
  ];

  return (
    <>
      <section className={ActivityStyles.between}>
        <div className={ActivityStyles.title}>나의 경험</div>
        <button className={ActivityStyles.btn} onClick={navActivityCreate}>
          + 경험 추가
        </button>
      </section>

      {/* 검색 버튼 - 클릭 시 검색 모달 OPEN */}
      <button onClick={handleOpenSearchModal} className={ActivityStyles.search}>
        <img src={SearchIcon} alt="검색" />
        <span>키워드, 내용으로 검색</span>
      </button>

      {/* 검색 모달 */}
      <ActivitySearchModal
        isOpen={isOpen}
        title={'경험 검색'}
        onConfirm={navActivityCreate}
        onClose={handleCloseSearchModal}
      />

      <section className={ActivityStyles.list}>
        {activities.length > 0 ? (
          activities.map((activityCard, index) => (
            <div key={index}>
              <ActivityCard
                activityId={activityCard.activityId}
                title={activityCard.title}
                startDate={new Date(activityCard.startDate)}
                endDate={new Date(activityCard.endDate)}
                projectTitle={activityCard.projectTitle ?? ''}
                keywords={activityCard.keywords}
              />
            </div>
          ))
        ) : (
          <>
            <div></div>
            <div className={ActivityStyles.nothing}>
              <img src={EmptyFolder} alt="비어있는 경험" />
              <p>만들어진 경험이 없어요.</p>
              <p className={ActivityStyles.semibold}>경험을 추가해 주세요!</p>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default ActivityList;
