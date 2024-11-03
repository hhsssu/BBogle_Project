import { useState } from 'react';
import style from './QuestionSection.module.css';

interface Props {
  index: number;
  question: string;
  description: string;
  isFileType: boolean;
  circleRef: React.RefObject<HTMLDivElement> | null;
  lineRef: React.RefObject<HTMLDivElement> | null;
}

function QuestionSection({
  index,
  question,
  description,
  isFileType = false,
  circleRef,
  lineRef,
}: Props) {
  const [textValue, setTextValue] = useState('');

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <div className={style.inputSection}>
      <div className={style.questionSection}>
        <div ref={circleRef} className={style.outerCircle}>
          <div className={style.innerCircle}>{index}</div>
          {isFileType ? '' : <div ref={lineRef} className={style.line}></div>}
        </div>
        <span className={style.question}>{question}</span>
      </div>

      <p className={style.description}>{description}</p>
      {isFileType ? (
        <input className={style.textArea} type="file"></input>
      ) : (
        <div className={style.textBlock}>
          <textarea
            className={style.textArea}
            value={textValue}
            onChange={handleText}
            maxLength={500}
          ></textarea>
          <p className={style.textLength}>{textValue.length} / 500자</p>
        </div>
      )}
    </div>
  );
}

export default QuestionSection;
