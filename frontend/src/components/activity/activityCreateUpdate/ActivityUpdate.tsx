import { useNavigate, useParams } from 'react-router-dom';

import ActivityForm from './ActivityForm';
import useActivityStore from '../../../store/useActivityStore';

import ActivityStyles from '../Activity.module.css';
import ActivityCreateStyles from './ActivityCreate.module.css';

import BackIcon from '../../../assets/image/icon/Back.svg';
import { useEffect } from 'react';

function ActivityUpdate() {
  const nav = useNavigate();
  const { activityId } = useParams();
  // activityId를 숫자로 변환
  const numericActivityId = activityId ? parseInt(activityId, 10) : 0;

  const { activity, fetchActivityById, updateActivity } = useActivityStore();

  // ✅데이터 불러오기
  useEffect(() => {
    fetchActivityById(numericActivityId);
  }, [activityId]);

  // 돌아가기
  const handleGoBack = () => {
    nav(-1);
  };

  // 폼 제출 로직
  const handleFormSubmit = () => {
    // TODO 폼 제출 로직 수정
    // updateActivity({
    //   activityId: numericActivityId, // 현재 활동의 ID
    //   title,
    //   content,
    //   startDate,
    //   endDate,
    //   projectId: projectId ?? 0, // null일 경우 기본값 0 사용
    //   keywords: selectedOptions, // 키워드 배열
    // });
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
          경험 수정
        </div>
        <button
          className={`${ActivityStyles.regist} ${ActivityCreateStyles.regist}`}
          onClick={handleFormSubmit}
        >
          수정 완료
        </button>
      </section>

      <ActivityForm
        onSubmit={handleFormSubmit}
        initialValues={{
          title: activity.title,
          content: activity.content,
          startDate: activity.startDate,
          endDate: activity.endDate,
          projectId: activity.projectId,
          keywords: activity.keywords,
        }}
      />
    </>
  );
}

export default ActivityUpdate;
