import style from './ProjectAlarmInput.module.css';

import ToggleOn from '../../../../../assets/image/icon/ToggleOn.svg';
import ToggleOff from '../../../../../assets/image/icon/ToggleOff.svg';

import useProjectStore from '../../../../../store/useProjectStore';

interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

function ProjectAlarmInput() {
  const project = useProjectStore((state) => state.project);
  const updateProject = useProjectStore((state) => state.updateProjectField);

  const handleToggleState = () => {
    updateProject('notificationStatus', !project.notificationStatus);
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value.split(':');
    const notificationTime: Time = {
      hour: Number(time[0]),
      minute: Number(time[1]),
      second: 0,
      nano: 0,
    };
    updateProject('notificationTime', notificationTime);
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

export default ProjectAlarmInput;
