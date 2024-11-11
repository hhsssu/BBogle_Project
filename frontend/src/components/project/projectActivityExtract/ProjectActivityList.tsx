import ActivityCard from '../../activity/ActivityCard';
import { Activity } from '../../../store/useActivityStore';

import styles from './ProjectActivity.module.css';
import ActivityStyles from '../../activity/Activity.module.css';

import EmptyFolder from '../../../assets/image/icon/EmptyFolder.svg';

interface ProjectActivityProps {
  activities: Activity[];
  selectedActivities: { [key: number]: boolean };
  handleSelect: (activityId: number) => void;
  handlePreview: (activityId: number) => void;
}

function ProjectActivityList({
  activities,
  selectedActivities,
  handleSelect,
  handlePreview,
}: ProjectActivityProps) {
  return (
    <section className={styles.listbox}>
      {activities.length > 0 ? (
        activities.map((activityCard, index) => (
          <div key={index} className={styles.cardmargin}>
            <ActivityCard
              activityId={activityCard.activityId}
              title={activityCard.title}
              startDate={activityCard.startDate}
              endDate={activityCard.endDate}
              projectTitle={activityCard.projectTitle ?? ''}
              keywords={activityCard.keywords}
              isExtract={true}
              isSelected={!!selectedActivities[activityCard.activityId]}
              onClick={() => handleSelect(activityCard.activityId)}
              onPreviewClick={() => handlePreview(activityCard.activityId)}
            />
          </div>
        ))
      ) : (
        <>
          <div></div>
          <div className={ActivityStyles.nothing}>
            <img
              src={EmptyFolder}
              alt="비어있는 경험"
              style={{ width: `25%` }}
            />
            <p>경험이 비어있어요</p>
          </div>
        </>
      )}
    </section>
  );
}

export default ProjectActivityList;
