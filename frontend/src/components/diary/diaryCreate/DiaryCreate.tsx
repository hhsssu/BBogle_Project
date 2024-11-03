import style from './DiaryCreate.module.css';
import useProjectStore from '../../../store/useProjectStore';
import { useNavigate } from 'react-router-dom';
import QuestionSection from '../questionSection/QuestionSection';
import useDiaryStore from '../../../store/useDiaryStore';
import React, { useEffect, useRef } from 'react';

function DiaryCreate() {
  const questionList = useDiaryStore((state) => state.questionList);

  const navigate = useNavigate();
  const project = useProjectStore((state) => state.project);

  const circleRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const lineRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const positionArr = useRef<number[]>([]);

  const navPjtDetail = () => {
    navigate(`/project/${project.pjtID}`);
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

    positionArr.current = circleRefArr.current.map((circleRef) =>
      circleRef.current ? circleRef.current.offsetTop : 0,
    );
  };

  useEffect(() => {
    updateLineHeight();

    window.addEventListener('resize', updateLineHeight);

    return () => {
      window.removeEventListener('resize', updateLineHeight);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.backBtn} onClick={navPjtDetail}>
        돌아가기
      </div>

      <div className={style.diaryTitle}>오늘의 Runner Way는 어땠나요?</div>

      <section className={style.diaryForm}>
        {questionList.map((question, index) => {
          if (!circleRefArr.current[index]) {
            circleRefArr.current[index] = React.createRef();
          }

          if (!lineRefArr.current[index]) {
            lineRefArr.current[index] = React.createRef();
          }

          return (
            <QuestionSection
              key={index}
              index={index + 1}
              question={question.question}
              description={question.description}
              isFileType={question.isFileType}
              circleRef={circleRefArr.current[index]}
              lineRef={lineRefArr.current[index]}
            />
          );
        })}
      </section>
    </div>
  );
}

export default DiaryCreate;
