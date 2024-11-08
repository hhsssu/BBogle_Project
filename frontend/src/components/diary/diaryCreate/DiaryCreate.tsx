import style from './DiaryCreate.module.css';
import useProjectStore from '../../../store/useProjectStore';
import { useNavigate } from 'react-router-dom';
import QnaInput from '../qnaInput/QnaInput';
import useDiaryStore from '../../../store/useDiaryStore';
import React, { useEffect, useRef, useState } from 'react';
import DiaryImgInput from '../diaryImgInput/DiaryImgInput';
import DiaryLoading from '../../common/loading/DiaryLoading';

import AlertTriangle from '../../../assets/image/icon/AlertTriangle.svg';

function DiaryCreate() {
  const questionList = useDiaryStore((state) => state.questionList);
  const answerList = useDiaryStore((state) => state.answerList);

  const navigate = useNavigate();
  const project = useProjectStore((state) => state.project);
  const initQnaList = useDiaryStore((state) => state.initQnaList);

  const circleRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const lineRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const questionRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const positionArr = useRef<number[]>([]);

  const [textLengthErr, setTextLengthErr] = useState(true);
  const [errMsgOn, setErrMsgOn] = useState(false);

  const [isFinLoadingOpen, setFinLoadingOpen] = useState(false);

  // const [currentIdx, setCurrentIdx] = useState(0);

  const navPjtDetail = () => {
    navigate(`/project/${project.projectId}`);
  };

  const updateLineHeight = () => {
    lineRefArr.current.map(
      (line: React.RefObject<HTMLDivElement>, index: number) => {
        if (line.current && circleRefArr.current[index]?.current) {
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

    questionRefArr.current.map((ref, index) => {
      if (ref.current) {
        positionArr.current[index] = ref.current?.offsetTop;
      }
    });
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

  // let lastScrollY = 0;
  // const handleScroll = () => {
  //   const scrollTop = window.scrollY;
  //   const scrollDirectionDown = lastScrollY < scrollTop;

  //   let newIdx = currentIdx;

  //   if (scrollDirectionDown && currentIdx < positionArr.current.length - 1) {
  //     const scrollLoc =
  //       positionArr.current[currentIdx] +
  //       (positionArr.current[currentIdx + 1] -
  //         positionArr.current[currentIdx]) /
  //         3;
  //     if (scrollTop >= scrollLoc) {
  //       newIdx = currentIdx + 1;
  //     }
  //   } else if (!scrollDirectionDown && currentIdx > 0) {
  //     const scrollLoc =
  //       positionArr.current[currentIdx] -
  //       (positionArr.current[currentIdx] -
  //         positionArr.current[currentIdx - 1]) /
  //         3;

  //     if (scrollTop <= scrollLoc) {
  //       newIdx = currentIdx - 1;
  //     }
  //   }

  //   if (newIdx !== currentIdx) {
  //     setCurrentIdx(newIdx);
  //     window.scrollTo({
  //       top: positionArr.current[newIdx],
  //       behavior: 'smooth',
  //     });
  //   }

  //   lastScrollY = scrollTop;
  // };

  useEffect(() => {
    initQnaList();

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
      if (!questionRefArr.current[index]) {
        questionRefArr.current[index] = React.createRef();
      }
    }
  }, []);

  useEffect(() => {
    updateLineHeight();
  }, [questionList]);

  return (
    <div className={style.container}>
      <div className={style.backBtn} onClick={navPjtDetail}>
        돌아가기
      </div>

      <div className={style.diaryTitle}>오늘의 {project.title}</div>

      <section className={style.diaryForm}>
        {questionList.map((question, index) => {
          if (!lineRefArr.current[index]) {
            lineRefArr.current[index] = React.createRef();
          }

          return (
            <div ref={questionRefArr.current[index]} key={index}>
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
        <div ref={questionRefArr.current[questionList.length]}>
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

      <DiaryLoading isLoading={isFinLoadingOpen} />
      {isFinLoadingOpen}
    </div>
  );
}

export default DiaryCreate;
