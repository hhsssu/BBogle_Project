import { useNavigate, useParams } from 'react-router-dom';
import ProjectAlarmInput from '../projectAlarmInput/ProjectAlarmInput';
import ProjectDetailInfoInput from '../projectDetailInfoInput/ProjectDetailInfoInput';
import ProjectInfoInput from '../projectInfoInput/ProjectInfoInput';
import ProjectTagInput from '../projectTagInput/ProjectTagInput';
import style from './ProjectUpdate.module.css';
import useProjectStore from '../../../store/useProjectStore';
import { useEffect, useState } from 'react';

function ProjectUpdate() {
  const { pjtId } = useParams();
  const navigate = useNavigate();

  const project = useProjectStore((state) => state.project);
  const getProject = useProjectStore((state) => state.getProject);

  const [titleError, setTitleError] = useState(false);
  const [termError, setTermError] = useState(false);

  const navPjtList = () => {
    navigate(`/project/${pjtId}`);
  };

  const handleTitleError = (value: boolean) => {
    setTitleError(value);
  };

  const handleTermError = (value: boolean) => {
    setTermError(value);
  };

  const updateProject = () => {
    if (project.title === '') {
      setTitleError(true);
      return;
    }

    if (project.startDate === '' || project.endDate === '') {
      setTermError(true);
      return;
    }

    console.log(project);
    navigate(`/project/${pjtId}`);
  };

  useEffect(() => {
    getProject(Number(pjtId));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.backBtn} onClick={navPjtList}>
        돌아가기
      </div>

      <span className={style.pageTitle}>프로젝트 수정</span>
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
        <button className={style.submitBtn} onClick={updateProject}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ProjectUpdate;
