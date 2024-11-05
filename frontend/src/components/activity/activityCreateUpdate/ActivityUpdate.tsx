import { useNavigate, useParams } from 'react-router-dom';

import ActivityForm from './ActivityForm';
import { ActivityFormData } from '../../../store/useActivityStore';

import ActivityStyles from '../Activity.module.css';
import ActivityCreateStyles from './ActivityCreate.module.css';

import BackIcon from '../../../assets/image/icon/Back.svg';

function ActivityUpdate() {
  const nav = useNavigate();
  const { activityId } = useParams();

  // exID를 숫자로 변환
  const numericActivityId = activityId ? parseInt(activityId, 10) : 0;

  // 돌아가기
  const handleGoBack = () => {
    nav(-1);
  };

  // 폼 제출 로직
  const handleSubmit = (formData: ActivityFormData) => {
    console.log('폼 제출 데이터:', formData);
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
          경험 수정
        </div>
        <button
          className={`${ActivityStyles.regist} ${ActivityCreateStyles.regist}`}
          // onClick={handleFormSubmit}
        >
          수정 완료
        </button>
      </section>

      {/* TODO 폼 제출 오류 해결하기 */}
      {/* <ActivityForm
        activityId={numericActivityId}
        onSubmit={handleFormSubmit}
      /> */}
    </>
  );
}

export default ActivityUpdate;
