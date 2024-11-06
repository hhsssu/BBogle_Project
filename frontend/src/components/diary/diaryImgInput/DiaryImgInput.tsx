import { useRef, useState } from 'react';
import style from './DiaryImgInput.module.css';
import ImageUpload from '../../../assets/image/icon/ImageUpload.svg';
import Close from '../../../assets/image/icon/Close.svg';

interface Props {
  index: number;
  question: string;
  description: string;
  circleRef: React.RefObject<HTMLDivElement> | null;
}

function DiaryImgInput({ index, question, description, circleRef }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<string[]>([]);

  const handleImgUploadClick = () => {
    if (fileInputRef.current && files.length < 3) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      console.log(file.type);
      console.log(isImage);
      if (!isImage) {
        alert('이미지 파일만 업로드 가능합니다 !');
        return;
      }
      const newImageUrl = URL.createObjectURL(file); // 새 이미지 URL 생성
      setFiles((prevImgArr) => [...prevImgArr, newImageUrl]); // 이미지 상태 업데이트
    }
  };

  const handleImageDelete = (deleteIndex: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== deleteIndex));
  };

  return (
    <div className={style.inputSection}>
      <div className={style.questionSection}>
        <div ref={circleRef} className={style.outerCircle}>
          <div className={style.innerCircle}>{index}</div>
        </div>
        <span className={style.question}>{question}</span>
      </div>
      <p className={style.description}>{description}</p>
      <div
        className={`${style.textArea} ${style.imgInput}`}
        onClick={handleImgUploadClick}
      >
        {files.length > 0 ? (
          <div className={style.imgInput}>
            {files.map((file, index) => (
              <div key={index} className={style.imgExBlock}>
                <img
                  key={index + 'img'}
                  className={style.imgEx}
                  src={file}
                ></img>
                <img
                  key={index + 'Close'}
                  className={style.close}
                  src={Close}
                  alt="삭제"
                  onClick={() => handleImageDelete(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={style.imgInput}>
            <img src={ImageUpload} alt="이미지 업로드" />
            <div>
              <p>이미지를 업로드 해주세요.</p>
              <p>(.jpg, .jpeg, .png, .svg)</p>
            </div>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        className={style.hiddenInput}
        type="file"
        onChange={handleImageUpload}
      ></input>
    </div>
  );
}

export default DiaryImgInput;
