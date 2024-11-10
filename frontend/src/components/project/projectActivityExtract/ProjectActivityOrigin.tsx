import useActivityStore from '../../../store/useActivityStore';
import { Activity } from '../../../store/useActivityStore';

import styles from './ProjectActivity.module.css';

import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ProjectActivityList from './ProjectActivityList';

interface ProjectActivityOriginProps {
  setSelectedActivity: (activity: Activity) => void;
}

function ProjectActivityOrigin({
  setSelectedActivity,
}: ProjectActivityOriginProps) {
  // TODO 해당 프로젝트 기존 경험 가져오기
  const { activities } = useActivityStore();
  const { pjtId } = useParams();
  const [selectedActivities, setSelectedActivities] = useState<{
    [key: number]: boolean;
  }>({});
  // 모든 항목이 선택된 상태인지 여부를 저장
  const [isAllSelected, setIsAllSelected] = useState(false);

  // 미리보기 선택 처리 함수
  const handlePreview = (activityId: number) => {
    const activity = activities.find(
      (activity) => activity.activityId === activityId,
    );
    if (activity) {
      setSelectedActivity(activity); // 선택된 activity 전달
    }
  };

  // 경험 단일 선택/해제 처리 함수
  const handleSelect = (activityId: number) => {
    setSelectedActivities((prevSelected) => ({
      ...prevSelected,
      [activityId]: !prevSelected[activityId], // 선택 상태를 토글
    }));
  };

  // 모든 경험 선택/해제 처리 함수
  const handleSelectAll = () => {
    // 선택 또는 해제된 상태에 따라 모든 활동을 선택하거나 해제
    const newSelectedState = !isAllSelected;
    const updatedSelectedActivities = activities.reduce(
      (acc, activity) => {
        acc[activity.activityId] = newSelectedState;
        return acc;
      },
      {} as { [key: number]: boolean },
    );

    setSelectedActivities(updatedSelectedActivities);
    setIsAllSelected(newSelectedState);
  };

  useEffect(() => {
    const allSelected =
      activities.length > 0 &&
      activities.every((activity) => selectedActivities[activity.activityId]);
    setIsAllSelected(allSelected);
  }, [selectedActivities, activities]);

  return (
    <div className={styles.listcontainer}>
      <section className={styles.between}>
        <div className={`${styles.origintitle} ${styles.center}`}>기존</div>
        <button onClick={handleSelectAll} className={styles.all}>
          {isAllSelected ? '선택 해제' : '모두 선택'}
        </button>
      </section>

      <ProjectActivityList
        activities={activities}
        selectedActivities={selectedActivities}
        handleSelect={handleSelect}
        handlePreview={handlePreview}
      />
    </div>
  );
}

export default ProjectActivityOrigin;
