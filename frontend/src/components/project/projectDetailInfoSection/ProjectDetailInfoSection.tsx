import style from './ProjectDetailInfoSection.module.css';

import { useState } from 'react';

function ProjectDetailInfoSection() {
  const [teammate, setTeammate] = useState(1);

  const handleTeammate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target) {
      setTeammate(Number(event.target.value));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.inputLabel}>
        <p className={style.label}>
          <span>프로젝트 기간</span>
          <span className={style.essential}>*</span>
        </p>
        <div className={style.term}>
          <div className={style.dateWrapper}>
            <p className={style.dateLabel}>시작일</p>
            <input className={style.datePicker} type="date" />
          </div>
          <span className={style.separator}>~</span>
          <div className={style.dateWrapper}>
            <p className={style.dateLabel}>종료일</p>
            <input className={style.datePicker} type="date" />
          </div>
        </div>
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>프로젝트 인원</span>
        <div>
          <select
            className={style.select}
            value={teammate}
            onChange={handleTeammate}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          명
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailInfoSection;
