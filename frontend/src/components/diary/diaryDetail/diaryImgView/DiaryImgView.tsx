import style from './DiaryImgView.module.css';

import Download from '../../../../assets/image/icon/Download.svg';
import useDiaryStore from '../../../../store/useDiaryStore';

interface Props {
  index: number;
  question: string;
  circleRef: React.RefObject<HTMLDivElement> | null;
}

function DiaryImgView({ index, question, circleRef }: Props) {
  const { title, imageUrlList } = useDiaryStore();

  const handleImageDownload = (index: number) => {
    const imageUrl = imageUrlList[index];
    if (!imageUrl) return;

    fetch(imageUrl, { method: 'GET' })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);

        // a 태그 생성 및 다운로드 속성 설정
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = `${title}_${index + 1}`; // 파일명 설정
        link.click();

        // a 태그 제거
        link.remove();
      })
      .catch((e) => {
        console.log(e);
      });
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
        {imageUrlList.map((file, index) => (
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
