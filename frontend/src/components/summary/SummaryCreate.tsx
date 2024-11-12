import styles from './Summary.module.css';
interface SummaryCreateProps {
  onCancleClick: () => void;
}
// TODO 회고 수동 생성 API 연결

function SummaryCreate({ onCancleClick }: SummaryCreateProps) {
  return (
    <>
      <form>
        <textarea
          name="content"
          rows={15}
          placeholder="내용을 입력하세요"
          className={styles.editbox}
        ></textarea>
      </form>
      <div className={styles.center}>
        <button className={styles.blackbtn} onClick={onCancleClick}>
          취소
        </button>
        <button className={styles.orangebtn}>등록</button>
      </div>
    </>
  );
}

export default SummaryCreate;
