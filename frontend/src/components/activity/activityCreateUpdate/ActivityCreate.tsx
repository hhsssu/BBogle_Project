import { useNavigate } from 'react-router-dom';

import ActivityForm from './ActivityForm';

import ActivityStyles from '../Activity.module.css';
import ActivityCreateStyles from './ActivityCreate.module.css';

import BackIcon from '../../../assets/image/icon/Back.svg';

function ActivityCreate() {
  const nav = useNavigate();

  // 돌아가기
  const handleGoBack = () => {
    nav(-1);
  };

  // 폼 제출 로직
  const handleFormSubmit = () => {
    event?.preventDefault();
  };

  return (
    <>
      <div className={ActivityStyles.backBtn} onClick={handleGoBack}>
        <img src={BackIcon} alt="돌아가기" />
        돌아가기
      </div>

      <section className={ActivityStyles.between}>
        <div
          className={`${ActivityStyles.center} ${ActivityStyles.title} ${ActivityCreateStyles.title}`}
        >
          경험 작성
        </div>
        <button
          className={`${ActivityStyles.regist} ${ActivityCreateStyles.regist}`}
          onClick={handleFormSubmit}
        >
          등록하기
        </button>
      </section>
      <ActivityForm
        onSubmit={handleFormSubmit}
        initialValues={{
          title: '',
          content: '',
          startDate: '',
          endDate: '',
          projectId: null,
          keywords: [],
        }}
      />
    </>
  );
}

export default ActivityCreate;
