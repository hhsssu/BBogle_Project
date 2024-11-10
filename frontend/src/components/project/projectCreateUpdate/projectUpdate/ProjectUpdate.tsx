import style from '../ProjectCreateUpdate.module.css';

import AlertTriangle from '../../../../assets/image/icon/AlertTriangle.svg';
import Back from '../../../../assets/image/icon/Back.svg';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useProjectStore from '../../../../store/useProjectStore';

import ProjectForm from '../projectForm/ProjectForm';
import Modal from '../../../common/modal/Modal';

function ProjectUpdate() {
  const { pjtId } = useParams();
  const navigate = useNavigate();

  const project = useProjectStore((state) => state.project);
  const getProject = useProjectStore((state) => state.getProject);

  const {
    titleError,
    setTitleError,
    termError,
    setTermError,
    errMsgOn,
    setErrMsgOn,
  } = useProjectStore();

  const [isBackModalOpen, setBackModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const navPjtDetail = () => {
    navigate(`/project/${pjtId}`);
  };

  const handleBackModal = () => {
    setBackModalOpen(!isBackModalOpen);
  };

  const handleUpdateModal = () => {
    setUpdateModalOpen(!isUpdateModalOpen);
  };

  const submitForm = () => {
    if (project.title === '') {
      setTitleError(true);
      setErrMsgOn(true);
      return;
    }

    if (project.startDate === '' || project.endDate === '') {
      setTermError(true);
      setErrMsgOn(true);
      return;
    }

    setUpdateModalOpen(true);
  };

  const updateProject = () => {
    setUpdateModalOpen(!isUpdateModalOpen);

    console.log(project);
    navigate(`/project/${pjtId}`);
  };

  useEffect(() => {
    getProject(Number(pjtId));
    setTitleError(false);
    setTermError(false);
    setErrMsgOn(false);
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.backBtn} onClick={handleBackModal}>
          <img src={Back} alt="뒤로가기 버튼" />
          {project.title}
        </div>

        <span className={style.pageTitle}>프로젝트 수정</span>
        <div className={style.pjtFormWrapper}>
          <ProjectForm />
          <button
            className={`${style.submitBtn} ${(titleError || termError) && errMsgOn && style.failBtn}`}
            onClick={submitForm}
          >
            완료
          </button>
          {errMsgOn && (
            <div className={style.errMsg}>
              <img className={style.warnIcon} src={AlertTriangle} alt="경고" />
              필수 입력값을 확인해주세요{' '}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isBackModalOpen}
        title={'이 페이지를 벗어나시겠어요?'}
        content={'작성 내용이 초기화됩니다.'}
        onClose={handleBackModal}
        onConfirm={navPjtDetail}
        confirmText={'이동'}
        cancleText={'취소'}
      />

      <Modal
        isOpen={isUpdateModalOpen}
        title={'프로젝트를 수정하시겠어요?'}
        content={''}
        onClose={handleUpdateModal}
        onConfirm={updateProject}
        confirmText={'확인'}
        cancleText={'취소'}
      />
    </div>
  );
}

export default ProjectUpdate;
