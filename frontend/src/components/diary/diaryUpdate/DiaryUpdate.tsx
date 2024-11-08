import { useNavigate, useParams } from 'react-router-dom';
import style from './DiaryUpdate.module.css';
import useDiaryStore from '../../../store/useDiaryStore';
import React, { useEffect, useRef, useState } from 'react';
import QnaInput from '../qnaInput/QnaInput';
import DiaryImgInput from '../diaryImgInput/DiaryImgInput';

import AlertTriangle from '../../../assets/image/icon/AlertTriangle.svg';
import Back from '../../../assets/image/icon/Back.svg';

function DiaryUpdate() {
  const navigate = useNavigate();
  const { pjtId, diaryId } = useParams();

  const questionList = useDiaryStore((state) => state.questionList);
  const answerList = useDiaryStore((state) => state.answers);
  const getQnaList = useDiaryStore((state) => state.getQnaList);

  const circleRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const lineRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const [textLengthErr, setTextLengthErr] = useState(true);
  const [errMsgOn, setErrMsgOn] = useState(false);

  const navDiaryDetail = () => {
    navigate(`/project/${pjtId}/diary/${diaryId}`);
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

  const updateLineHeight = () => {
    lineRefArr.current.map(
      (line: React.RefObject<HTMLDivElement>, index: number) => {
        if (line.current) {
          const topLoc =
            Number(circleRefArr.current[index].current?.offsetTop) +
            Number(circleRefArr.current[index].current?.offsetHeight);
          const bottomCircle = Number(
            circleRefArr.current[index + 1].current?.offsetTop,
          );
          line.current.style.height = `${bottomCircle - topLoc}px`;
        }
      },
    );
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

    window.addEventListener('resize', updateLineHeight);
    // window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateLineHeight);
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    checkTotalLength();
  }, [answerList]);

  useEffect(() => {
    for (let index = 0; index <= questionList.length; index++) {
      if (!circleRefArr.current[index]) {
        circleRefArr.current[index] = React.createRef();
      }
    }
  }, []);

  useEffect(() => {
    updateLineHeight();
  }, [questionList]);

  return (
    <div className={style.container}>
      <div className={style.backBtn} onClick={navDiaryDetail}>
        <img src={Back} alt="뒤로가기 버튼" />
        돌아가기
      </div>

      <div className={style.diaryTitle}>내용 한 줄 요약</div>

      <section className={style.diaryForm}>
        {questionList.map((question, index) => {
          if (!lineRefArr.current[index]) {
            lineRefArr.current[index] = React.createRef();
          }

          return (
            <div key={index}>
              <QnaInput
                index={index + 1}
                question={question.question}
                description={question.description}
                answer={answerList[index]}
                circleRef={circleRefArr.current[index]}
                lineRef={lineRefArr.current[index]}
              />
            </div>
          );
        })}

        <div>
          <DiaryImgInput
            index={questionList.length + 1}
            question={'첨부 이미지 업로드'}
            description={
              '관련된 이미지를 최대 3장까지 첨부할 수 있어요 ! (1장 당 최대 5MB)'
            }
            circleRef={circleRefArr.current[3]}
          />
        </div>
      </section>

      <button
        className={`${style.updateBtn} ${textLengthErr && style.failBtn}`}
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
    </div>
  );
}

export default DiaryUpdate;
