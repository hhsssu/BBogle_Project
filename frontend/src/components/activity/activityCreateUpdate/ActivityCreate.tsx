import { useNavigate } from 'react-router-dom';

import ActivityForm from './ActivityForm';

import ActivityStyles from '../Activity.module.css';
import ActivityCreateStyles from './ActivityCreate.module.css';

import BackIcon from '../../../assets/image/icon/Back.svg';
import useActivityStore from '../../../store/useActivityStore';
import { useState } from 'react';

function ActivityCreate() {
  const nav = useNavigate();
  const createActivity = useActivityStore((state) => state.createActivity);

  // 폼 상태 관리
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
    projectId: number | undefined;
    keywords: { id: number; type: boolean; name: string }[];
  }>({
    title: '',
    content: '',
    startDate: new Date(),
    endDate: new Date(),
    projectId: undefined,
    keywords: [],
  });

  // 돌아가기
  const handleGoBack = () => {
    nav(-1);
  };

  // 폼 제출 로직
  const handleFormSubmit = () => {
    event?.preventDefault();
    createActivity(formData);
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
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        initialValues={formData}
      />
    </>
  );
}

export default ActivityCreate;
