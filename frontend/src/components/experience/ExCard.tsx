import ExStyles from './Experience.module.css';
import MoreIcon from '../../assets/image/icon/More.svg';
import { useNavigate } from 'react-router-dom';

interface Tag {
  type: number;
  name: string;
}

interface ExInfoProps {
  exID: number;
  title: string;
  startDate: Date;
  endDate: Date;
  projectName: string;
  keywords: Tag[];
}

// 경험 카드
function ExCard({
  exID,
  title,
  startDate,
  endDate,
  keywords,
  projectName,
}: ExInfoProps) {
  const nav = useNavigate();
  const navDetail = (exID: number) => {
    nav(`${exID}`);
  };

  return (
    <div className={ExStyles.card} onClick={() => navDetail(exID)}>
      {/* 소제목과 더보기 메뉴 버튼 */}
      <div className={ExStyles.header}>
        <section className={ExStyles.between}>
          <div className={ExStyles.subtitle}>{title}</div>
          <button>
            <img src={MoreIcon} alt="더 보기 메뉴" />
          </button>
        </section>

        {/* 시작일 ~ 종료일 */}
        <div className={ExStyles.date}>
          {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
        </div>
      </div>

      {/* 관련 프로젝트 명 */}
      <div className={ExStyles.date}>{projectName}</div>

      {/* 경험 태그 */}
      <section className={ExStyles.keywords}>
        {keywords.map((keyword, index) => (
          <div key={index}>
            {/* 기술태그 0 blue / 인성태그 1 yellow */}
            {keyword.type === 0 ? (
              <span className={ExStyles.bluekeyword}>{keyword.name}</span>
            ) : (
              <span className={ExStyles.yellowkeyword}>{keyword.name}</span>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default ExCard;
