import { useNavigate } from 'react-router-dom';
import style from './ProjectCreate.module.css';

import ProjectInfoSection from '../projectInfoSection/ProjectInfoSection';
import ProjectDetailInfoSection from '../projectDetailInfoSection/ProjectDetailInfoSection';
import ProjectTagSection from '../projectTagSection/ProjectTagSection';
import ProjectAlarmSection from '../projectAlarmSection/ProjectAlarmSection';

function ProjectCreate() {
  const navigate = useNavigate();

  const navMain = () => {
    navigate('/main');
  };

  return (
    <div className={style.container}>
      <div className={style.back} onClick={navMain}>
        돌아가기
      </div>

      <span className={style.head}>프로젝트 생성</span>
      <div className={style.pjtForm}>
        <ProjectInfoSection />
        <ProjectDetailInfoSection />
        <ProjectTagSection />
        <ProjectAlarmSection />
      </div>
    </div>
  );
}

export default ProjectCreate;
