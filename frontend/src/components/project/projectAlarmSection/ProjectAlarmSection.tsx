import style from './ProjectAlarmSection.module.css';

import ToggleOn from '../../../assets/image/icon/ToggleOn.svg';
import ToggleOff from '../../../assets/image/icon/ToggleOff.svg';

import { useState } from 'react';

function ProjectAlarmSection() {
  const [toggleOn, setToggleOn] = useState(false);

  const [time, setTime] = useState('17:30');

  const handleToggleState = () => {
    setToggleOn(!toggleOn);
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.inputLabel}>
        <span className={style.label}>알림 설정</span>
        <div className={style.toggleSec}>
          {toggleOn ? (
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

          {toggleOn ? (
            <div>
              <input
                className={style.timeInput}
                type="time"
                value={time}
                onChange={handleTime}
              />
            </div>
          ) : (
            <div className={style.timeToggleOff}>
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
