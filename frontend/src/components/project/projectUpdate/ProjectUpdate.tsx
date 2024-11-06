import { useNavigate, useParams } from 'react-router-dom';
import ProjectAlarmSection from '../projectAlarmSection/ProjectAlarmSection';
import ProjectDetailInfoSection from '../projectDetailInfoSection/ProjectDetailInfoSection';
import ProjectInfoSection from '../projectInfoSection/ProjectInfoSection';
import ProjectTagSection from '../projectTagSection/ProjectTagSection';
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

    if (project.startDate === '' || project.finishDate === '') {
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
        <button className={style.submitBtn} onClick={updateProject}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ProjectUpdate;
