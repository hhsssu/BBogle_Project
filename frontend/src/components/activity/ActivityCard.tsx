import ActivityStyles from './Activity.module.css';
import MoreIcon from '../../assets/image/icon/More.svg';
import DetailIcon from '../../assets/image/icon/Detail.svg';

interface Keyword {
  id: number;
  type: boolean;
  name: string;
}

interface ActivityInfoProps {
  activityId?: number | undefined;
  title: string;
  startDate: Date;
  endDate: Date;
  projectId?: number;
  projectTitle?: string | undefined;
  keywords: Keyword[];
  isExtract: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onPreviewClick?: (activityId: number) => void;
}

// 경험 카드
function ActivityCard({
  activityId,
  title,
  startDate,
  endDate,
  keywords,
  projectTitle,
  isExtract,
  isSelected,
  onClick,
  onPreviewClick,
}: ActivityInfoProps) {
  // TODO 경험 추출에서 선택 시 미리보기에 값 전달

  // 경험 추출 선택 페이지에서의 경험 카드
  const handleDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPreviewClick && activityId !== undefined) {
      onPreviewClick(activityId);
    }
  };

  // 경험 목록 페이지에서의 경험 카드
  const handleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO 수정 삭제 메뉴 뜨는 함수
    // if (onMenuClick) {
    //   onMenuClick();
    // }
  };

  return (
    <div
      className={
        isSelected
          ? `${ActivityStyles.card} ${ActivityStyles.selected}`
          : `${ActivityStyles.card} `
      }
      onClick={onClick}
    >
      {/* 소제목과 더보기 메뉴 버튼 */}
      <div className={ActivityStyles.header}>
        <section className={ActivityStyles.between}>
          <div className={ActivityStyles.subtitle}>{title}</div>
          <button>
            {isExtract ? (
              <img
                src={DetailIcon}
                alt="미리보기 버튼"
                onClick={handleDetail}
              />
            ) : (
              <img src={MoreIcon} alt="더 보기 메뉴" onClick={handleMenu} />
            )}
          </button>
        </section>

        {/* 시작일 ~ 종료일 */}
        {startDate && endDate ? (
          <div className={ActivityStyles.date}>
            {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
          </div>
        ) : (
          ''
        )}
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
