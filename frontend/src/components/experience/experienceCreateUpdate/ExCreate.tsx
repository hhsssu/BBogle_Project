import { useNavigate } from 'react-router-dom';

import ExForm from './ExForm';

import ExStyles from '../Experience.module.css';
import ExCreateStyles from './ExCreate.module.css';

import BackIcon from '../../../assets/image/icon/Back.svg';

function ExCreate() {
  const nav = useNavigate();

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
          경험 작성
        </div>
        <button className={`${ExStyles.regist} ${ExCreateStyles.regist}`}>
          등록하기
        </button>
      </section>
      <ExForm exID={0} />
    </>
  );
}

export default ExCreate;
