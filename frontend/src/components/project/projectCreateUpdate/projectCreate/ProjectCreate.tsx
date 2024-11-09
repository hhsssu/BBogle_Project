import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ProjectCreate.module.css';

import ProjectInfoInput from '../projectForm/projectInfoInput/ProjectInfoInput';
import ProjectDetailInfoInput from '../projectForm/projectDetailInfoInput/ProjectDetailInfoInput';
import ProjectTagInput from '../projectForm/projectTagInput/ProjectTagInput';
import ProjectAlarmInput from '../projectForm/projectAlarmInput/ProjectAlarmInput';
import useProjectStore from '../../../../store/useProjectStore';

import AlertTriangle from '../../../../assets/image/icon/AlertTriangle.svg';
import Modal from '../../../common/modal/Modal';

function ProjectCreate() {
  const navigate = useNavigate();

  const project = useProjectStore((state) => state.project);
  const initProject = useProjectStore((state) => state.initProject);

  const [titleError, setTitleError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [errMsgOn, setErrMsgOn] = useState(false);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const navPjtList = () => {
    navigate('/project');
  };

  const handleTitleError = (value: boolean) => {
    setTitleError(value);

    if (!titleError) {
      setErrMsgOn(false);
    }
  };

  const handleTermError = (value: boolean) => {
    setTermError(value);

    if (!termError) {
      setErrMsgOn(false);
    }
  };

  const addProject = () => {
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

    setCreateModalOpen(true);
  };

  const handleCreateModal = () => {
    setCreateModalOpen(!isCreateModalOpen);
  };

  const createProject = () => {
    setCreateModalOpen(!isCreateModalOpen);

    console.log(project);
    navigate('/project');
  };

  useEffect(() => {
    initProject();
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.backBtn} onClick={navPjtList}>
          돌아가기
        </div>

        <span className={style.pageTitle}>프로젝트 생성</span>
        <div className={style.pjtFormWrapper}>
          <div className={style.pjtForm}>
            <ProjectInfoInput
              titleError={titleError}
              handleTitleError={handleTitleError}
            />
            <ProjectDetailInfoInput
              termError={termError}
              handleTermError={handleTermError}
            />
            <ProjectTagInput />
            <ProjectAlarmInput />
          </div>
          <button
            className={`${style.submitBtn} ${(titleError || termError) && errMsgOn && style.failBtn}`}
            onClick={addProject}
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
        isOpen={isCreateModalOpen}
        title={'프로젝트를 생성하시겠어요?'}
        content={''}
        onClose={handleCreateModal}
        onConfirm={createProject}
        confirmText={'확인'}
        cancleText={'취소'}
      />
    </div>
  );
}

export default ProjectCreate;
