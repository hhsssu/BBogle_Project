import Edit from '../../assets/image/icon/Pencil.svg';
import styles from './Summary.module.css';

interface SummaryDetailProps {
  onEditClick: () => void;
  content: string;
}

function SummaryDetail({ onEditClick, content }: SummaryDetailProps) {
  return (
    <section className={styles.contentbox}>
      <button className={styles.editbtn} onClick={onEditClick}>
        <img src={Edit} alt="수정" />
        <span className={styles.edit}>수정</span>
      </button>
      <div>{content}</div>
    </section>
  );
}

export default SummaryDetail;
