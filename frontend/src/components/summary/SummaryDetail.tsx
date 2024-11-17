import Edit from '../../assets/image/icon/Pencil.svg';
import styles from './Summary.module.css';
import useActivityStore from '../../store/useActivityStore';
import { useNavigate } from 'react-router-dom';

interface SummaryDetailProps {
  onEditClick: () => void;
  content: string;
}

function SummaryDetail({ onEditClick, content }: SummaryDetailProps) {
  const createActivityAi = useActivityStore((state) => state.createActivityAi);

  const navigate = useNavigate();

  const requestCreateActivity = async () => {
    try {
      await createActivityAi(content);
      navigate('extract');
    } catch (error) {
      console.error('경험 생성 오류 : ', error);
    }
  };

  return (
    <>
      <section className={styles.contentbox}>
        <button className={styles.editbtn} onClick={onEditClick}>
          <img src={Edit} alt="수정" />
          <span className={styles.edit}>수정</span>
        </button>
        <div className={styles.content}>{content}</div>
      </section>
      <div className={styles.center}>
        <button className={styles.orangebtn} onClick={requestCreateActivity}>
          경험 추출
        </button>
      </div>
    </>
  );
}

export default SummaryDetail;
