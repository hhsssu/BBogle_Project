import { useNavigate } from 'react-router-dom';
import style from './ProjectCreate.module.css';

import ProjectInfoSection from '../projectInfoSection/ProjectInfoSection';
import ProjectDetailInfoSection from '../projectDetailInfoSection/ProjectDetailInfoSection';
import ProjectTagSection from '../projectTagSection/ProjectTagSection';
import ProjectAlarmSection from '../projectAlarmSection/ProjectAlarmSection';
import useProjectStore from '../../../store/useProjectStore';
import { useState } from 'react';

function ProjectCreate() {
  const navigate = useNavigate();

  const project = useProjectStore((state) => state.project);

  const [titleError, setTitleError] = useState(false);
  const [termError, setTermError] = useState(false);

  const navMain = () => {
    navigate('/main');
  };

  const handleTitleError = (value: boolean) => {
    setTitleError(value);
  };

  const handleTermError = (value: boolean) => {
    setTermError(value);
  };

  const addProject = () => {
    if (project.title === '') {
      setTitleError(true);
      return;
    }

    if (project.startDate === '' || project.finishDate === '') {
      setTermError(true);
      return;
    }

    console.log(project);
    navigate('/project');
  };

  return (
    <div className={style.container}>
      <div className={style.back} onClick={navMain}>
        돌아가기
      </div>

      <span className={style.head}>프로젝트 생성</span>
      <div className={style.pjtFormWrapper}>
        <div className={style.pjtForm}>
          <ProjectInfoSection
            titleError={titleError}
            handleTitleError={handleTitleError}
          />
          <ProjectDetailInfoSection
            termError={termError}
            handleTermError={handleTermError}
          />
          <ProjectTagSection />
          <ProjectAlarmSection />
        </div>
        <button className={style.endBtn} onClick={addProject}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ProjectCreate;
