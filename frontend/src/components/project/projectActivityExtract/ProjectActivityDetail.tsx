import { Activity } from '../../../store/useActivityStore';
import ActivityStyles from '../../activity/Activity.module.css';
import styles from './ProjectActivity.module.css';
import Extract from '../../../assets/image/icon/Extract.svg';

interface ProjectActivityDetailProps {
  activity: Activity | null;
}

function ProjectActivityDetail({ activity }: ProjectActivityDetailProps) {
  return (
    <div className={styles.precontainer}>
      <div className={styles.previewtitle}>미리보기</div>
      <section className={`${styles.listbox} ${styles.detailbox}`}>
        {activity ? (
          <>
            <div className={`${styles.detailtitle} ${ActivityStyles.center}`}>
              {activity.title}
            </div>
            <div className={ActivityStyles.between}>
              {/* 키워드 나열 */}
              <div className={ActivityStyles.flex}>
                {activity.keywords.map((keyword, index) => (
                  <div key={index}>
                    {!keyword.type ? (
                      <span className={ActivityStyles.bluekeyword}>
                        {keyword.name}
                      </span>
                    ) : (
                      <span className={ActivityStyles.yellowkeyword}>
                        {keyword.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* 경험 날짜 */}
              {activity.startDate && activity.endDate ? (
                <div className={`${ActivityStyles.flex} ${styles.date}`}>
                  {activity.startDate.toLocaleDateString()} ~{' '}
                  {activity.endDate.toLocaleDateString()}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className={styles.content}>{activity.content}</div>
          </>
        ) : (
          <div className={ActivityStyles.nothing}>
            <img src={Extract} alt="경험 선택 전" style={{ width: `25%` }} />
            <p className={styles.description}>
              경험 카드의 돋보기 아이콘을 클릭해 주세요!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectActivityDetail;
