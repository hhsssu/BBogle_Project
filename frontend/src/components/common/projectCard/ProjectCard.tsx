import MoreVertical from '../../../assets/image/icon/morevertical.svg';
import Bell from '../../../assets/image/icon/bell.svg';

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
    <div className={style['pjt-card']}>
      <section className={style['pjt-card-sec-1']}>
        <img className={style['pjt-card-img']} src={imageSrc} alt="" />
        <div className={style['pjt-card-sec-1-div']}>
          <div className={style['pjt-card-sec-1-div-1']}>
            <span className={style['pjt-card-title']}>{title}</span>
            <div
              className={`${style['pjt-card-state']} ${style[state ? 'pjt-card-state-true' : 'pjt-card-state-false']}`}
            >
              {state ? '진행 중' : '종료'}
            </div>
          </div>
          <div className={style['pjt-card-term']}>{term}</div>
        </div>
        <img
          className={style['pjt-card-more']}
          src={MoreVertical}
          alt="더보기"
        />
      </section>

      <section className={style['pjt-card-sec-2']}>
        <div className={style['pjt-card-summary']}>{summary}</div>
        <img className={style['pjt-card-bell']} src={Bell} alt="알림 아이콘" />
      </section>
    </div>
  );
}
export default ProjectCard;
