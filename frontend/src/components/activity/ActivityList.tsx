import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useActivityStore from '../../store/useActivityStore';

import ActivityCard from './ActivityCard';
import ActivityStyles from './Activity.module.css';

import SearchIcon from '../../assets/image/icon/Search.svg';
import EmptyFolder from '../../assets/image/icon/EmptyFolder.svg';
// import useProjectStore from '../../store/useProjectStore';

function ActivityList() {
  const nav = useNavigate();
  const navigate = useNavigate();
  const { activities } = useActivityStore();
  // const {project, fetchProject} = useProjectStore();

  // 경험 수동 생성으로 이동
  const navActivityCreate = () => {
    nav('create');
  };
  // 경험 상세 페이지로 이동
  const navDetail = (activityId: number) => {
    nav(`${activityId}`);
  };

  // 경험
  useEffect(() => {
    // fetchActivities();
    console.log(`activities: `, activities);
  }, []);

  const handleSearchPage = () => {
    navigate('search');
  };

  return (
    <>
      <section className={ActivityStyles.between}>
        <div className={ActivityStyles.title}>나의 경험</div>
        <button className={ActivityStyles.btn} onClick={navActivityCreate}>
          + 경험 추가
        </button>
      </section>

      {/* 검색 버튼 - 클릭 시 검색 모달 OPEN */}
      <button onClick={handleSearchPage} className={ActivityStyles.search}>
        <img src={SearchIcon} alt="검색" />
        <span>키워드, 내용으로 검색</span>
      </button>

      {/* 검색 모달 */}
      {/* <ActivitySearchModal
        isOpen={isOpen}
        title={'경험 검색'}
        onConfirm={navActivityCreate}
        onClose={handleCloseSearchModal}
      /> */}

      <section className={ActivityStyles.list}>
        {activities.length > 0 ? (
          activities.map((activityCard, index) => (
            <div key={index}>
              <ActivityCard
                activityId={activityCard.activityId}
                title={activityCard.title}
                startDate={activityCard.startDate}
                endDate={activityCard.endDate}
                projectId={activityCard.projectId}
                projectTitle={activityCard.projectTitle ?? ''}
                keywords={activityCard.keywords}
                isExtract={false}
                onClick={() => navDetail(activityCard.activityId)}
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
