import style from './goToDiary.module.css';
import MemoIcon from '../../../assets/image/icon/Memo.svg';

function GoToDiary() {
  return (
    <button className={style.button}>
      <img className={style.memo} src={MemoIcon} alt="Memo" />
      <div className={style.description}>개발일지 남기러 가기</div>
    </button>
  );
}

export default GoToDiary;
