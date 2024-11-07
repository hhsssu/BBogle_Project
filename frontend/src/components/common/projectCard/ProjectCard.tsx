import MoreVertical from '../../../assets/image/icon/MoreVertical.svg';
import Bell from '../../../assets/image/icon/Bell.svg';
import ActiveBell from '../../../assets/image/icon/ActiveBell.svg';
import Pencil from '../../../assets/image/icon/Pencil.svg';
import RedTrash from '../../../assets/image/icon/RedTrash.svg';

import style from './ProjectCard.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';

interface Props {
  pjtId: number;
  imageSrc: string;
  title: string;
  state: boolean;
  term: string;
  summary: string;
}

function ProjectCard({ pjtId, imageSrc, title, state, term, summary }: Props) {
  const navigate = useNavigate();
  const moreIconRef = useRef<HTMLImageElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlarmOn, setAlarmOn] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleModalOpen = (e: React.MouseEvent) => {
    setModalOpen(!isModalOpen);
    e.stopPropagation();
  };

  const handleAlarmState = (e: React.MouseEvent) => {
    setAlarmOn(!isAlarmOn);
    e.stopPropagation();
  };

  const navPjtUpdate = (e: React.MouseEvent) => {
    navigate(`/project/${pjtId}/update`);
    e.stopPropagation();
  };

  const handleDeleteModal = () => {
    setModalOpen(false);
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteProject = () => {
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
          <img className={style.img} src={imageSrc} alt="" />
          <div>
            <div className={style.titleWrapper}>
              <span className={style.title}>
                {title.length > 10 ? title.substring(0, 11) + '...' : title}
              </span>
              <div
                className={`${style.state} ${state ? style.stateActive : style.stateInactive}`}
              >
                {state ? '진행 중' : '종료'}
              </div>
            </div>
            <div className={style.term}>{term}</div>
          </div>

          <div ref={moreIconRef}>
            <img
              className={`${style.moreIcon} ${isModalOpen && style.selected}`}
              src={MoreVertical}
              alt="더보기"
              onClick={handleModalOpen}
            />
            {isModalOpen && (
              <div className={style.modalBox}>
                <div className={style.modalContent} onClick={navPjtUpdate}>
                  <img className={style.modalImg} src={Pencil} alt="수정" />
                  <p>수정</p>
                </div>
                <div
                  className={style.modalContent}
                  onClick={(e) => {
                    handleDeleteModal();
                    e.stopPropagation();
                  }}
                >
                  <img className={style.modalImg} src={RedTrash} alt="삭제" />
                  삭제
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={style.cardContent}>
          <div className={style.summary}>{summary}</div>
          {isAlarmOn ? (
            <img
              className={style.bellIcon}
              src={ActiveBell}
              alt="알림 아이콘"
              onClick={handleAlarmState}
            />
          ) : (
            <img
              className={style.bellIcon}
              src={Bell}
              alt="알림 아이콘"
              onClick={handleAlarmState}
            />
          )}
        </section>
      </div>

      {isDeleteModalOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <Modal
            isOpen={isDeleteModalOpen}
            title={'정말 프로젝트를 삭제하시겠어요?'}
            content={'삭제 시 복구가 어려워요'}
            onClose={handleDeleteModal}
            onConfirm={deleteProject}
            confirmText={'확인'}
            cancleText={'취소'}
          />
        </div>
      )}
    </div>
  );
}
export default ProjectCard;
