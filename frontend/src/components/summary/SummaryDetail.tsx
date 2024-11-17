import Edit from '../../assets/image/icon/Pencil.svg';
import styles from './Summary.module.css';
import useProjectStore from '../../store/useProjectStore';

interface SummaryDetailProps {
  onEditClick: () => void;
  content: string;
}

function SummaryDetail({ onEditClick, content }: SummaryDetailProps) {
  const project = useProjectStore((state) => state.project);

  const requestCreateActivity = async () => {
    // TODO 추후 연결 예정
    // await createActivityAi();
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
      {!project.status && (
        <div className={styles.center}>
          <button className={styles.orangebtn} onClick={requestCreateActivity}>
            경험 추출
          </button>
        </div>
      )}
    </>
  );
}

export default SummaryDetail;
