import useActivityStore from '../../../store/useActivityStore';
import { Activity } from '../../../store/useActivityStore';

import styles from './ProjectActivity.module.css';
import { useEffect, useState } from 'react';
import ProjectActivityList from './ProjectActivityList';
import { NewActivity } from '../../../api/activityApi';
// import { useParams } from 'react-router-dom';

interface ProjectActivityOriginProps {
  setSelectedActivity: (activity: Activity) => void;
  setSelectedNewActivities: (activities: NewActivity[]) => void;
}

function ProjectActivityNew({
  setSelectedActivity,
  setSelectedNewActivities,
}: ProjectActivityOriginProps) {
  // TODO 추출된 경험 선택 API 사용
  const newActivities = useActivityStore((state) => state.newActivities);
  // const { pjtId } = useParams();
  const [selectedActivities, setSelectedActivities] = useState<{
    [key: number]: boolean;
  }>({});

  // 모든 항목이 선택된 상태인지 여부를 저장
  const [isAllSelected, setIsAllSelected] = useState(false);

  // 미리보기 선택 처리 함수
  const handlePreview = (activityId: number) => {
    const activity = newActivities.find(
      (activity) => activity.activityId === activityId,
    );
    if (activity) {
      setSelectedActivity(activity); // 선택된 activity 전달
    }
  };

  // 경험 선택/해제 처리 함수
  const handleSelect = (activityId: number) => {
    setSelectedActivities((prevSelected) => ({
      ...prevSelected,
      [activityId]: !prevSelected[activityId], // 선택 상태를 토글
    }));
  };

  // 모든 경험 선택/해제 처리 함수
  // TODO activityId 관련 오류

  const handleSelectAll = () => {
    // 선택 또는 해제된 상태에 따라 모든 활동을 선택하거나 해제
    const newSelectedState = !isAllSelected;
    const updatedSelectedActivities = newActivities.reduce(
      (acc, activity) => {
        if (activity.activityId !== undefined) {
          acc[activity.activityId] = newSelectedState;
        }
        return acc;
      },
      {} as { [key: number]: boolean },
    );

    setSelectedActivities(updatedSelectedActivities);
    setIsAllSelected(newSelectedState);
  };

  useEffect(() => {
    const allSelected =
      newActivities.length > 0 &&
      newActivities.every((activity) => {
        return activity.activityId !== undefined
          ? selectedActivities[activity.activityId]
          : false;
      });
    setIsAllSelected(allSelected);

    const selectedNewActivities = newActivities
      .filter((activity) => selectedActivities[activity.activityId])
      .map((activity) => ({
        title: activity.title,
        content: activity.content,
        startDate: activity.startDate,
        endDate: activity.endDate,
        keywords: activity.keywords.map((keyword) => keyword.id),
      }));
    setSelectedNewActivities(selectedNewActivities);
  }, [selectedActivities, newActivities]);

  return (
    <div className={`${styles.listcontainer} ${styles.newcontainer}`}>
      <section className={styles.between}>
        <div className={`${styles.newtitle} ${styles.center}`}>신규</div>
        <button onClick={handleSelectAll} className={styles.all}>
          {isAllSelected ? '선택 해제' : '모두 선택'}
        </button>
      </section>
      <ProjectActivityList
        activities={newActivities}
        selectedActivities={selectedActivities}
        handleSelect={handleSelect}
        handlePreview={handlePreview}
      />
    </div>
  );
}

export default ProjectActivityNew;
