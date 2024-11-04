import { useNavigate, useParams } from 'react-router-dom';

import ExForm from './ExForm';

import ExStyles from '../Experience.module.css';
import ExCreateStyles from './ExCreate.module.css';

import BackIcon from '../../../assets/image/icon/Back.svg';

function ExUpdate() {
  const nav = useNavigate();
  const { exID } = useParams();

  // exID를 숫자로 변환
  const numericExID = exID ? parseInt(exID, 10) : 0;

  // 돌아가기
  const handleGoBack = () => {
    nav(-1);
  };

  return (
    <>
      <div className={ExStyles.backBtn} onClick={handleGoBack}>
        <img src={BackIcon} alt="돌아가기" />
        돌아가기
      </div>

      <section className={ExStyles.between}>
        <div
          className={`${ExStyles.center} ${ExStyles.title} ${ExCreateStyles.title}`}
        >
          경험 수정
        </div>
        <button className={`${ExStyles.regist} ${ExCreateStyles.regist}`}>
          수정 완료
        </button>
      </section>
      <ExForm exID={numericExID} />
    </>
  );
}

export default ExUpdate;
