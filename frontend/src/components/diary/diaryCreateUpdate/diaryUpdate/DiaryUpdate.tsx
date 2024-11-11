import style from '../DiaryCreateUpdate.module.css';

import AlertTriangle from '../../../../assets/image/icon/AlertTriangle.svg';
import Back from '../../../../assets/image/icon/Back.svg';
import DiaryForm from '../diaryForm/DiaryForm';

import useDiaryStore from '../../../../store/useDiaryStore';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../../common/modal/Modal';

function DiaryUpdate() {
  const navigate = useNavigate();
  const { pjtId, diaryId } = useParams();

  const answerList = useDiaryStore((state) => state.answers);
  const getQnaList = useDiaryStore((state) => state.getQnaList);

  const [textLengthErr, setTextLengthErr] = useState(true);
  const [errMsgOn, setErrMsgOn] = useState(false);

  const [isBackModalOpen, setBackModalOpen] = useState(false);

  const navDiaryDetail = () => {
    navigate(`/project/${pjtId}/diary/${diaryId}`);
  };

  const handleBackModal = () => {
    setBackModalOpen(!isBackModalOpen);
  };

  const updateDiary = () => {
    if (textLengthErr) {
      setErrMsgOn(true);
    } else {
      setTextLengthErr(true);
      setErrMsgOn(false);

      alert('개발일지 수정 완료!');
      navigate(`/project/${pjtId}/diary/${diaryId}`);
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
    getQnaList();
  }, []);

  useEffect(() => {
    checkTotalLength();
  }, [answerList]);

  return (
    <div className={style.container}>
      <div className={style.backBtn} onClick={handleBackModal}>
        <img src={Back} alt="뒤로가기 버튼" />
        돌아가기
      </div>

      <div className={style.diaryTitle}>내용 한 줄 요약</div>

      <DiaryForm />

      <button
        className={`${style.submitBtn} ${textLengthErr && style.failBtn}`}
        onClick={updateDiary}
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
        onConfirm={navDiaryDetail}
        confirmText={'이동'}
        cancleText={'취소'}
      />
    </div>
  );
}

export default DiaryUpdate;
