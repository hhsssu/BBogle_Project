import { useNavigate } from 'react-router';
import { Activity } from '../../../store/useActivityStore';

import ActivityStyles from '../../activity/Activity.module.css';
import styles from './ProjectActivity.module.css';

import BackIcon from '../../../assets/image/icon/Back.svg';
import ProjectActivityOrigin from './ProjectActivityOrigin';
import ProjectActivityNew from './ProjectActivityNew';
import ProjectActivityDetail from './ProjectActivityDetail';
import { useState } from 'react';

function ProjectActivityExtract() {
  const navigate = useNavigate();
  // 선택된 데이터 저장할 상태
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );

  // 돌아가기
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={ActivityStyles.container}>
      <div className={ActivityStyles.backBtn} onClick={handleGoBack}>
        <img src={BackIcon} alt="돌아가기" />
        돌아가기
      </div>
      <div className={`${ActivityStyles.center} ${ActivityStyles.title}`}>
        경험 선택
      </div>
      <div className={styles.description}>
        선택되지 않은 경험은 삭제됩니다. (기존 경험 포함)
      </div>

      <section className={styles.list}>
        <ProjectActivityOrigin setSelectedActivity={setSelectedActivity} />
        <ProjectActivityNew setSelectedActivity={setSelectedActivity} />
        <ProjectActivityDetail activity={selectedActivity} />
      </section>
      <div className={ActivityStyles.center}>
        <button className={ActivityStyles.btn}>저장</button>
      </div>
    </div>
  );
}

export default ProjectActivityExtract;
