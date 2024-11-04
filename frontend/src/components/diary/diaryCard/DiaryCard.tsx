import style from './DiaryCard.module.css';

import MoreVertical from '../../../assets/image/icon/MoreVertical.svg';

interface Props {
  title: string;
  date: string;
}

function DiaryCard({ title, date }: Props) {
  return (
    <div className={style.card}>
      <section className={style.cardHeader}>
        <span className={style.title}>
          {title.length > 15 ? title.substring(0, 16) + '...' : title}
        </span>
        <img className={style.moreIcon} src={MoreVertical} alt="더보기" />
      </section>
      <div className={style.date}>{date}</div>
    </div>
  );
}

export default DiaryCard;
