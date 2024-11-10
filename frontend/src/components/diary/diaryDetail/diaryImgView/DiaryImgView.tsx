import style from './DiaryImgView.module.css';

import Download from '../../../../assets/image/icon/Download.svg';

interface Props {
  index: number;
  question: string;
  circleRef: React.RefObject<HTMLDivElement> | null;
}

function DiaryImgView({ index, question, circleRef }: Props) {
  const files: string[] = ['ex', 'ex2'];

  const handleImageDownload = (index: number) => {
    console.log(index);
  };

  return (
    <div className={style.container}>
      <div className={style.questionContainer}>
        <div ref={circleRef} className={style.outerCircle}>
          <div className={style.innerCircle}>{index}</div>
        </div>
        <span className={style.question}>{question}</span>
      </div>

      <div className={style.imgContainer}>
        {files.map((file, index) => (
          <div key={index} className={style.imgExBlock}>
            <img key={index + 'img'} className={style.imgEx} src={file}></img>
            <img
              key={index + 'Download'}
              className={style.download}
              src={Download}
              alt="삭제"
              onClick={() => handleImageDownload(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaryImgView;
