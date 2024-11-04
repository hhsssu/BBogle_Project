import { useNavigate, useParams } from 'react-router-dom';
import style from './DiaryUpdate.module.css';
import useProjectStore from '../../../store/useProjectStore';
import useDiaryStore from '../../../store/useDiaryStore';
import React, { useEffect, useRef } from 'react';
import QnaInput from '../qnaInput/QnaInput';

function DiaryUpdate() {
  const navigate = useNavigate();
  const { pjtId } = useParams();

  const questionList = useDiaryStore((state) => state.questionList);
  const answerList = useDiaryStore((state) => state.answerList);

  const circleRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const lineRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const navPjtDetail = () => {
    navigate(`/project/${pjtId}`);
  };

  const updateDiary = () => {
    let totalTextLength = 0;
    answerList.map((answer) => (totalTextLength += answer.length));

    console.log(answerList);
    if (totalTextLength < 50) {
      alert('전체 글자 수가 50자 이상이어야 저장할 수 있습니다.');
    } else {
      navigate('/project/0');
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

  useEffect(() => {
    updateLineHeight();

    window.addEventListener('resize', updateLineHeight);
    // window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateLineHeight);
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.backBtn} onClick={navPjtDetail}>
        돌아가기
      </div>

      <div className={style.diaryTitle}>내용 한 줄 요약</div>

      <section className={style.diaryForm}>
        {questionList.map((question, index) => {
          if (!circleRefArr.current[index]) {
            circleRefArr.current[index] = React.createRef();
          }

          if (!lineRefArr.current[index]) {
            lineRefArr.current[index] = React.createRef();
          }

          return (
            <div key={index}>
              <QnaInput
                index={index + 1}
                question={question.question}
                description={question.description}
                isFileType={question.isFileType}
                circleRef={circleRefArr.current[index]}
                lineRef={lineRefArr.current[index]}
              />
            </div>
          );
        })}
      </section>

      <button className={style.updateBtn} onClick={updateDiary}>
        완료
      </button>
    </div>
  );
}

export default DiaryUpdate;
