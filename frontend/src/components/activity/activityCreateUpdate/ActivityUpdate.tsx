import { useNavigate, useParams } from 'react-router-dom';

import ActivityForm from './ActivityForm';
import useActivityStore from '../../../store/useActivityStore';

import ActivityStyles from '../Activity.module.css';
import ActivityCreateStyles from './ActivityCreate.module.css';

import BackIcon from '../../../assets/image/icon/Back.svg';
import { useEffect, useState } from 'react';

function ActivityUpdate() {
  const nav = useNavigate();
  const { activityId } = useParams();
  // activityId를 숫자로 변환
  const numericActivityId = activityId ? parseInt(activityId, 10) : 0;
  const activity = useActivityStore((state) => state.activity);
  const fetchActivityById = useActivityStore(
    (state) => state.fetchActivityById,
  );
  const updateActivity = useActivityStore((state) => state.updateActivity);

  // 폼 상태 관리
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
    projectId: number | undefined;
    keywords: { id: number; type: boolean; name: string }[];
  }>({
    title: activity.title,
    content: activity.content,
    startDate: new Date(activity.startDate),
    endDate: new Date(activity.endDate),
    projectId: activity.projectId ? activity.projectId : undefined,
    keywords: activity.keywords,
  });

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
    event?.preventDefault();
    updateActivity(
      numericActivityId, // 현재 활동의 ID
      formData,
    );
    nav(`${numericActivityId}`);
  };

  // 폼 데이터 업데이트
  const handleFormChange = (updatedData: {
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
    projectId: number | undefined;
    keywords: { id: number; type: boolean; name: string }[];
  }) => {
    setFormData(updatedData);
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
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        initialValues={formData}
      />
    </>
  );
}

export default ActivityUpdate;
