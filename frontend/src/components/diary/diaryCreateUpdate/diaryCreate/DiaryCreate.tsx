import style from '../DiaryCreateUpdate.module.css';

import Bubble from '../../../../assets/lottie/Bubble.json';
import AlertTriangle from '../../../../assets/image/icon/AlertTriangle.svg';
import Back from '../../../../assets/image/icon/Back.svg';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useProjectStore from '../../../../store/useProjectStore';

import Loading from '../../../common/loading/Loading';
import DiaryForm from '../diaryForm/DiaryForm';
import useDiaryStore from '../../../../store/useDiaryStore';
import Modal from '../../../common/modal/Modal';

function DiaryCreate() {
  const navigate = useNavigate();

  const project = useProjectStore((state) => state.project);
  const answerList = useDiaryStore((state) => state.answers);
  const initQnaList = useDiaryStore((state) => state.initQnaList);

  const [textLengthErr, setTextLengthErr] = useState(true);
  const [errMsgOn, setErrMsgOn] = useState(false);

  const [isBackModalOpen, setBackModalOpen] = useState(false);
  const [isFinLoadingOpen, setFinLoadingOpen] = useState(false);

  const navPjtDetail = () => {
    navigate(`/project/${project.projectId}`);
  };

  const handleBackModal = () => {
    setBackModalOpen(!isBackModalOpen);
  };

  const addDiary = () => {
    if (textLengthErr) {
      setErrMsgOn(true);
    } else {
      setTextLengthErr(true);
      setErrMsgOn(false);

      setFinLoadingOpen(true);
      setTimeout(() => {
        setFinLoadingOpen(false);
        navigate(`/project/${project.projectId}`);
      }, 2000);
    }
  };

  const checkTotalLength = () => {
    let totalTextLength = 0;
    answerList.map((answer) => (totalTextLength += answer.length));

    if (totalTextLength >= 50) {
      setTextLengthErr(false);
      setErrMsgOn(false);
    } else {
      setTextLengthErr(true);
    }
  };

  useEffect(() => {
    initQnaList();
  }, []);

  useEffect(() => {
    checkTotalLength();
  }, [answerList]);

  return (
    <div className={style.container}>
      <div className={style.backBtn} onClick={handleBackModal}>
        <img src={Back} alt="뒤로가기 버튼" />
        {project.title}
      </div>

      <div className={style.diaryTitle}>오늘의 {project.title}</div>

      <DiaryForm />

      <button
        className={`${style.submitBtn} ${textLengthErr && style.failBtn}`}
        onClick={addDiary}
      >
        완료
      </button>

      {errMsgOn && (
        <div className={style.errMsg}>
          <img className={style.warnIcon} src={AlertTriangle} alt="경고" />
          답변 길이가 너무 짧습니다! 50자 이상 작성해주세요{' '}
        </div>
      )}

      <Modal
        isOpen={isBackModalOpen}
        title={'이 페이지를 벗어나시겠어요?'}
        content={'작성 내용이 초기화됩니다.'}
        onClose={handleBackModal}
        onConfirm={navPjtDetail}
        confirmText={'이동'}
        cancleText={'취소'}
      />

      <Loading
        isLoading={isFinLoadingOpen}
        title="개발일지 작성 중 ..."
        animationData={Bubble}
      />
    </div>
  );
}

export default DiaryCreate;
