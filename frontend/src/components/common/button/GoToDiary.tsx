import React from 'react';
import style from './goToDiary.module.css';
import MemoIcon from '../../../assets/image/icon/Memo.svg';

interface GoToDiaryProps {
  isInactive: boolean;
}

function GoToDiary({ isInactive }: GoToDiaryProps) {
  return (
    <button
      className={`${style.button} ${isInactive ? style.inActive : ''}`}
      disabled={isInactive}
    >
      <img className={style.memo} src={MemoIcon} alt="Memo" />
      <div className={style.description}>개발일지 남기러 가기</div>
    </button>
  );
}

export default GoToDiary;
