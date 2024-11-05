import { useRef, useState } from 'react';
import style from './DiaryImgView.module.css';

interface Props {
  index: number;
  question: string;
  circleRef: React.RefObject<HTMLDivElement> | null;
}

function DiaryImgView({ index, question, circleRef }: Props) {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className={style.inputSection}>
      <div className={style.questionSection}>
        <div ref={circleRef} className={style.outerCircle}>
          <div className={style.innerCircle}>{index}</div>
        </div>
        <span className={style.question}>{question}</span>
      </div>

      <div className={style.imgInput}>
        {files.map((file, index) => (
          <div key={index} className={style.imgExBlock}>
            <img key={index + 'img'} className={style.imgEx} src={file}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaryImgView;
