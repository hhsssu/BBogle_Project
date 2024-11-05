import style from './DiaryCreate.module.css';
import useProjectStore from '../../../store/useProjectStore';
import { useNavigate } from 'react-router-dom';
import QnaInput from '../qnaInput/QnaInput';
import useDiaryStore from '../../../store/useDiaryStore';
import React, { useEffect, useRef } from 'react';

function DiaryCreate() {
  const questionList = useDiaryStore((state) => state.questionList);

  const navigate = useNavigate();
  const project = useProjectStore((state) => state.project);

  const circleRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const lineRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const questionRefArr = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const positionArr = useRef<number[]>([]);

  const answerList = useDiaryStore((state) => state.answerList);
  // const [currentIdx, setCurrentIdx] = useState(0);

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

    questionRefArr.current.map((ref, index) => {
      if (ref.current) {
        positionArr.current[index] = ref.current?.offsetTop;
      }
    });
  };

  const addDiary = () => {
    let totalTextLength = 0;
    answerList.map((answer) => (totalTextLength += answer.length));

    console.log(answerList);
    if (totalTextLength < 50) {
      alert('전체 글자 수가 50자 이상이어야 저장할 수 있습니다.');
    } else {
      navigate('/project/0');
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

      <div className={style.diaryTitle}>오늘의 Runner Way는 어땠나요?</div>

      <section className={style.diaryForm}>
        {questionList.map((question, index) => {
          if (!circleRefArr.current[index]) {
            circleRefArr.current[index] = React.createRef();
          }

          if (!lineRefArr.current[index]) {
            lineRefArr.current[index] = React.createRef();
          }

          if (!questionRefArr.current[index]) {
            questionRefArr.current[index] = React.createRef();
          }

          return (
            <div ref={questionRefArr.current[index]} key={index}>
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

      <button className={style.submitBtn} onClick={addDiary}>
        완료
      </button>
    </div>
  );
}

export default DiaryCreate;
