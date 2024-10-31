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
    <div className={style['card']}>
      <section className={style['sec1']}>
        <img className={style['img']} src={imageSrc} alt="" />
        <div>
          <div className={style.header}>
            <span className={style['title']}>
              {title.length > 10 ? title.substring(0, 11) + '...' : title}
            </span>
            <div
              className={`${style['state']} ${style[state ? 'stateTrue' : 'stateFalse']}`}
            >
              {state ? '진행 중' : '종료'}
            </div>
          </div>
          <div className={style['term']}>{term}</div>
        </div>
        <img className={style['more']} src={MoreVertical} alt="더보기" />
      </section>

      <section className={style['sec2']}>
        <div className={style['summary']}>{summary}</div>
        <img className={style['bell']} src={Bell} alt="알림 아이콘" />
      </section>
    </div>
  );
}
export default ProjectCard;
