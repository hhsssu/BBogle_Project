import ActivityStyles from './Activity.module.css';
import MoreIcon from '../../assets/image/icon/More.svg';
import { useNavigate } from 'react-router-dom';

interface Keyword {
  id: number;
  type: boolean;
  name: string;
}

interface ExInfoProps {
  activityId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  projectTitle?: string | undefined;
  keywords: Keyword[];
}

// 경험 카드
function ActivityCard({
  activityId,
  title,
  startDate,
  endDate,
  keywords,
  projectTitle,
}: ExInfoProps) {
  const nav = useNavigate();
  const navDetail = (exID: number) => {
    nav(`${exID}`);
  };

  return (
    <div className={ActivityStyles.card} onClick={() => navDetail(activityId)}>
      {/* 소제목과 더보기 메뉴 버튼 */}
      <div className={ActivityStyles.header}>
        <section className={ActivityStyles.between}>
          <div className={ActivityStyles.subtitle}>{title}</div>
          <button>
            <img src={MoreIcon} alt="더 보기 메뉴" />
          </button>
        </section>

        {/* 시작일 ~ 종료일 */}
        <div className={ActivityStyles.date}>
          {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
        </div>
      </div>

      {/* 프로젝트 명 & 태그 */}
      <div className={ActivityStyles.footer}>
        {/* 관련 프로젝트 명 */}
        <div className={ActivityStyles.project}>{projectTitle}</div>

        {/* 경험 태그 */}
        <section className={ActivityStyles.keywords}>
          {keywords.map((keyword, index) => (
            <div key={index}>
              {/* 기술태그 0 blue / 인성태그 1 yellow */}
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
        </section>
      </div>
    </div>
  );
}

export default ActivityCard;
