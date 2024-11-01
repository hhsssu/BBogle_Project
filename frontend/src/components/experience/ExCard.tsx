import ExStyles from './Experience.module.css';
import MoreIcon from '../../assets/image/icon/more.svg';
import { useNavigate } from 'react-router-dom';

interface Tag {
  type: number;
  name: string;
}

interface ExInfoProps {
  exId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  tags: Tag[];
}

// 경험 카드
function ExCard({ exId, title, startDate, endDate, tags }: ExInfoProps) {
  const nav = useNavigate();
  const navDetail = (exId: number) => {
    nav(`${exId}`);
  };

  return (
    <div className={ExStyles.card} onClick={() => navDetail(exId)}>
      {/* 소제목과 더보기 메뉴 버튼 */}
      <section className={ExStyles.between}>
        <div className={ExStyles.subhead}>{title}</div>
        <button>
          <img src={MoreIcon} alt="더 보기 메뉴" />
        </button>
      </section>

      {/* 시작일 ~ 종료일 */}
      <div className={ExStyles.date}>
        {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
      </div>

      {/* 경험 태그 */}
      <section className={ExStyles.tags}>
        {tags.map((tag, index) => (
          <div key={index}>
            {/* 기술태그 0 blue / 인성태그 1 yellow */}
            {tag.type === 0 ? (
              <span className={ExStyles.btag}>{tag.name}</span>
            ) : (
              <span className={ExStyles.ytag}>{tag.name}</span>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default ExCard;
