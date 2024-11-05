import style from './DiaryCard.module.css';

import MoreVertical from '../../../assets/image/icon/MoreVertical.svg';
import Pencil from '../../../assets/image/icon/pencil.svg';
import RedTrash from '../../../assets/image/icon/RedTrash.svg';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';

interface Props {
  diaryId: number;
  title: string;
  date: string;
}

function DiaryCard({ diaryId, title, date }: Props) {
  const navigate = useNavigate();
  const moreIconRef = useRef<HTMLImageElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };

  const navDiaryUpdate = () => {
    navigate(`diary/${diaryId}/update`);
  };

  const handleDeleteModal = () => {
    console.log('닫기');
    setModalOpen(false);
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteDiary = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreIconRef.current &&
        !moreIconRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={style.card}>
        <section className={style.cardHeader}>
          <span className={style.title}>
            {title.length > 15 ? title.substring(0, 16) + '...' : title}
          </span>
          <div
            ref={moreIconRef}
            className={`${style.moreIconContainer} ${isModalOpen && style.selected}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className={style.moreIcon}
              src={MoreVertical}
              alt="더보기"
              onClick={handleModalOpen}
            />
            {isModalOpen && (
              <div className={style.modalBox}>
                <div className={style.modalContent} onClick={navDiaryUpdate}>
                  <img className={style.modalImg} src={Pencil} alt="수정" />
                  <p>수정</p>
                </div>
                <div className={style.modalContent} onClick={handleDeleteModal}>
                  <img className={style.modalImg} src={RedTrash} alt="삭제" />
                  삭제
                </div>
              </div>
            )}
          </div>
        </section>
        <div className={style.date}>{date}</div>
      </div>

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          title={'정말 개발일지를 삭제하시겠어요?'}
          content={'삭제 시 복구가 어려워요'}
          onClose={handleDeleteModal}
          onConfirm={deleteDiary}
          confirmText={'확인'}
          cancleText={'취소'}
        />
      )}
    </div>
  );
}

export default DiaryCard;
