import style from './ProjectDetail.module.css';

import Back from '../../../assets/image/icon/Back.svg';
// import Bubble from '../../../assets/lottie/Bubble.json';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useProjectStore from '../../../store/useProjectStore';

import ProjectInfoSection from './projectInfoSection/ProjectInfoSection';
import ProjectLogSection from './projectLogSection/ProjectLogSection';
import Modal from '../../common/modal/Modal';
// import Loading from '../../common/loading/Loading';
import { finishProject } from '../../../api/projectApi';
// import { createActivityAi } from '../../../api/activityApi';

function ProjectDetail() {
  const project = useProjectStore((state) => state.project);

  const navigate = useNavigate();

  const [isFinModalOpen, setFinModalOpen] = useState(false);
  // const [isFinLoadingOpen, setFinLoadingOpen] = useState(false);

  const navPjtList = () => {
    navigate('/project');
  };

  const handleFinModal = () => {
    setFinModalOpen(!isFinModalOpen);
  };

  const onFinishProject = async () => {
    setFinModalOpen(false);
    // setFinLoadingOpen(true);

    await finishProject(project.projectId);
    navigate(0);

    // setFinLoadingOpen(false);
  };

  return (
    <div className={style.container}>
      <div>
        <div className={style.backBtn} onClick={navPjtList}>
          <img src={Back} alt="뒤로가기 버튼" />
          프로젝트 목록
        </div>

        <div className={style.pjtInfoSection}>
          <ProjectInfoSection />

          {project.status && (
            <button className={style.pjtEndBtn} onClick={handleFinModal}>
              프로젝트 종료
            </button>
          )}
        </div>
      </div>

      <ProjectLogSection />

      <Modal
        isOpen={isFinModalOpen}
        title={'프로젝트를 종료하시겠어요?'}
        content={'종료 시 더 이상 개발일지를 작성할 수 없어요'}
        onClose={handleFinModal}
        onConfirm={onFinishProject}
        confirmText={'종료'}
        cancleText={'취소'}
      />

      {/* <Loading
        isLoading={isFinLoadingOpen}
        title="회고록 작성 중 ..."
        animationData={Bubble}
      /> */}
    </div>
  );
}

export default ProjectDetail;
