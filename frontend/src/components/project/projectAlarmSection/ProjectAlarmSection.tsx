import style from './ProjectAlarmSection.module.css';

import ToggleOn from '../../../assets/image/icon/ToggleOn.svg';
import ToggleOff from '../../../assets/image/icon/ToggleOff.svg';

import useProjectStore from '../../../store/useProjectStore';

function ProjectAlarmSection() {
  const project = useProjectStore((state) => state.project);
  const updateProject = useProjectStore((state) => state.updateProjectField);

  const handleToggleState = () => {
    updateProject('alarmState', !project.notificationStatus);
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateProject('alarmTime', event.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.inputLabel}>
        <span className={style.label}>알림 설정</span>
        <div className={style.toggleSection}>
          {project.notificationStatus ? (
            <img
              className={style.toggle}
              src={ToggleOn}
              onClick={handleToggleState}
            />
          ) : (
            <img
              className={style.toggle}
              src={ToggleOff}
              onClick={handleToggleState}
            />
          )}

          {project.notificationStatus ? (
            <div>
              <input
                className={style.timeInput}
                type="time"
                value={
                  project.notificationTime.hour +
                  ':' +
                  project.notificationTime.minute
                }
                onChange={handleTime}
              />
            </div>
          ) : (
            <div className={style.timeToggleInActive}>
              <span>오후 </span>
              <span>05:30</span>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ProjectAlarmSection;
