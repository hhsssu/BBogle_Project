import React, { useState } from 'react';
import style from './ProfileImageUploader.module.css';

// 이미지 파일
import DownloadIcon from '../../assets/image/icon/Download.svg';
import DefaultImage from '../../assets/image/default/Image.svg';

function ProfileImageUploader() {
  // 미리보기 이미지 상태 및 업로드 진행률 상태 관리
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  // 파일 드롭 시 호출되는 함수
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  // 드래그 오버 시 기본 동작을 막는 함수
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // 이미지 업로드 처리 함수
  const uploadImage = (file: File) => {
    const reader = new FileReader();

    // 파일 읽고, 미리보기 이미지 업데이트
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };

    // 파일을 Data URL로 변환
    reader.readAsDataURL(file);

    // 업로드 진행률 시뮬레이션
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUploadProgress(progress);
      } else {
        clearInterval(interval);
      }
    }, 100); // Increment every 100ms for simulation
  };

  // 미리보기 이미지를 다운로드하는 함수
  const downloadImage = () => {
    if (previewImage) {
      const link = document.createElement('a');
      link.href = previewImage;
      link.download = 'uploaded_image.png';
      link.click();
    }
  };

  // 프로필 이미지 업데이트를 관리하는 함수
  const handleUpdate = () => {};

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <div className={style.profile}>
          <div className={style.preview}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="미리보기"
                className={style.previewImage}
              />
            ) : (
              <p>미리보기</p>
            )}
          </div>
          {previewImage && (
            <img
              src={DownloadIcon}
              alt="다운로드"
              className={style.downloadButton}
              onClick={downloadImage}
            />
          )}
        </div>

        <div
          className={style.dropZone}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img src={DefaultImage} alt="이미지" />
          <p>이미지 끌어 업로드 or 이미지 선택하기</p>
          <p>지원형식 : PNG, JPG</p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className={style.fileInput}
          />
        </div>
      </div>

      <div className={style.bottom}>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className={style.progressBarContainer}>
            <div
              className={style.progressBar}
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        <button onClick={handleUpdate}>수정 완료</button>
      </div>
    </div>
  );
}

export default ProfileImageUploader;
