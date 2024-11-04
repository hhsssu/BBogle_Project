import React, { useState } from 'react';
import style from './ProfileImageUploader.module.css';

import DownloadIcon from '../../assets/image/icon/Download.svg';

const ProfileImageUploader: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const uploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate upload progress
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

  const downloadImage = () => {
    if (previewImage) {
      const link = document.createElement('a');
      link.href = previewImage;
      link.download = 'uploaded_image.png'; // or any desired file name
      link.click();
    }
  };

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
          <p>이미지 끌어 업로드 or 이미지 선택하기</p>
          <p>PNG, JPG</p>
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
        <button>수정 완료</button>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
