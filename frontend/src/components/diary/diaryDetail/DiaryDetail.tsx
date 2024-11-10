import style from './DiaryDetail.module.css';

import Back from '../../../assets/image/icon/Back.svg';

import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import useProjectStore from '../../../store/useProjectStore';
import useDiaryStore from '../../../store/useDiaryStore';

import DiaryEntryView from './diaryEntryView/DiaryEntryView';
import DiaryImgView from './diaryImgView/DiaryImgView';

function DiaryDetail() {
  const navigate = useNavigate();
  const { pjtId } = useParams();
  const projectTitle = useProjectStore((state) => state.project.title);
  const questionList = useDiaryStore((state) => state.questionList);
  const answerList = useDiaryStore((state) => state.answers);
  const getQnaList = useDiaryStore((state) => state.getQnaList);

  const circleRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const lineRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const navPjtDetail = () => {
    navigate(`/project/${pjtId}`);
  };

  const navDiaryUpdate = () => {
    navigate('update');
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
    getQnaList();

    window.addEventListener('resize', updateLineHeight);
    // window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateLineHeight);
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <div className={style.backBtn} onClick={navPjtDetail}>
        <img src={Back} alt="뒤로가기 버튼" />
        {projectTitle}
      </div>

      <div className={style.diaryTitle}>내용 요약 한 줄</div>
      <button className={style.updateBtn} onClick={navDiaryUpdate}>
        수정
      </button>

      <section className={style.diaryForm}>
        {questionList.map((question, index) => {
          if (!lineRefArr.current[index]) {
            lineRefArr.current[index] = React.createRef();
          }

          return (
            <div key={index}>
              <DiaryEntryView
                index={index + 1}
                question={question.question}
                answer={answerList[index]}
                circleRef={circleRefArr.current[index]}
                lineRef={lineRefArr.current[index]}
              />
            </div>
          );
        })}
        <div>
          <DiaryImgView
            index={questionList.length + 1}
            question={'첨부 이미지 업로드'}
            circleRef={circleRefArr.current[3]}
          />
        </div>
      </section>
    </div>
  );
}

export default DiaryDetail;
