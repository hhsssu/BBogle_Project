import style from './ProjectInfoSection.module.css';

import Bubble from '../../../../assets/lottie/Bubble.json';
import Setting from '../../../../assets/image/icon/Setting.svg';
import Pencil from '../../../../assets/image/icon/Pencil.svg';
import RedTrash from '../../../../assets/image/icon/RedTrash.svg';
import DefaultProject from '../../../../assets/image/icon/DefaultProject.svg';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProjectStore from '../../../../store/useProjectStore';
import { deleteProject } from '../../../../api/projectApi';
import ImageWithDefault from '../../../my/ImageWithDefault';
import Modal from '../../../common/modal/Modal';
import Loading from '../../../common/loading/Loading';

function ProjectInfoSection() {
  const { pjtId } = useParams();
  const PROJECT = useProjectStore((state) => state.project);
  const getProject = useProjectStore((state) => state.getProject);
  const isProjectLoading = useProjectStore((state) => state.isProjectLoading);

  const settingIconRef = useRef<HTMLImageElement>(null);

  const [isExpandOpen, setExpandOpen] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };

  const handleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const navProjectUpdate = () => {
    setModalOpen(false);
    navigate(`update`);
  };

  const handleExpand = () => {
    setExpandOpen(!isExpandOpen);
  };

  const onDeleteProject = async () => {
    setDeleteModalOpen(!isDeleteModalOpen);
    try {
      await deleteProject(Number(pjtId));
      navigate('/project');
    } catch (error) {
      console.log('개발일지 삭제 실패');
      console.log(error);
    }
  };

  useEffect(() => {
    getProject(Number(pjtId));
    setExpandOpen(false);
  }, [getProject, pjtId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingIconRef.current &&
        !settingIconRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isProjectLoading) {
    return (
      <Loading
        isLoading={isProjectLoading}
        title="데이터 로딩 중 ..."
        animationData={Bubble}
      />
    );
  }

  return (
    <div className={style.container}>
      <div className={style.infoHeader}>
        <div className={style.pjtTitleContainer}>
          <div className={style.img}>
            <ImageWithDefault
              src={PROJECT.image}
              alt="로고"
              defaultSrc={DefaultProject}
            />
          </div>

          <span className={style.title}>{PROJECT.title}</span>
          <div ref={settingIconRef} className={style.settingBox}>
            <img
              className={style.setting}
              src={Setting}
              alt="설정"
              onClick={handleModalOpen}
            />
            <div
              className={`${style.status} ${PROJECT.status ? style.statusActive : style.statusInActive}`}
            >
              {PROJECT.status ? '진행 중' : '종료'}
            </div>
            {isModalOpen && (
              <div className={style.modalBox}>
                <div className={style.modalContent} onClick={navProjectUpdate}>
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
        </div>
      </div>

      <div
        className={`${style.description} ${!isExpandOpen && style.descriptionUnexpand}`}
      >
        {PROJECT.description}
      </div>
      <p className={style.expandBtn} onClick={handleExpand}>
        {isExpandOpen ? '접기' : '더보기'}
      </p>
      <div className={style.term}>
        {PROJECT.startDate} ~ {PROJECT.endDate} / {PROJECT.memberCount} 명
      </div>

      <div className={style.tagList}>
        <span className={style.tagLabel}>나의 역할</span>
        {PROJECT.role.map((role, index) => (
          <div key={index} className={style.tag}>
            {role}
          </div>
        ))}
      </div>

      <div className={style.tagList}>
        <span className={style.tagLabel}>사용 기술</span>
        {PROJECT.skill.map((skill, index) => (
          <div key={index} className={style.tag}>
            {skill}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        title={'정말 프로젝트를 삭제하시겠어요?'}
        content={'삭제 시 복구가 어려워요'}
        onClose={handleDeleteModal}
        onConfirm={onDeleteProject}
        confirmText={'확인'}
        cancleText={'취소'}
      />
    </div>
  );
}

export default ProjectInfoSection;
