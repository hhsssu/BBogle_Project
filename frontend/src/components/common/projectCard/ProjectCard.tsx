import MoreVertical from '../../../assets/image/icon/MoreVertical.svg';
import Bell from '../../../assets/image/icon/Bell.svg';

import style from './ProjectCard.module.css';

interface Props {
  imageSrc: string;
  title: string;
  state: boolean;
  term: string;
  summary: string;
}

function ProjectCard({ imageSrc, title, state, term, summary }: Props) {
  return (
    <div className={style.card}>
      <section className={style.cardHeader}>
        <img className={style.img} src={imageSrc} alt="" />
        <div>
          <div className={style.titleWrapper}>
            <span className={style.title}>
              {title.length > 10 ? title.substring(0, 11) + '...' : title}
            </span>
            <div
              className={`${style.state} ${state ? style.stateActive : style.stateInactive}`}
            >
              {state ? '진행 중' : '종료'}
            </div>
          </div>
          <div className={style.term}>{term}</div>
        </div>
        <img className={style.moreIcon} src={MoreVertical} alt="더보기" />
      </section>

      <section className={style.cardContent}>
        <div className={style.summary}>{summary}</div>
        <img className={style.bellIcon} src={Bell} alt="알림 아이콘" />
      </section>
    </div>
  );
}
export default ProjectCard;
