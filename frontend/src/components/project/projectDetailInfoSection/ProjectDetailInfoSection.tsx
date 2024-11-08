import useProjectStore from '../../../store/useProjectStore';
import style from './ProjectDetailInfoSection.module.css';

interface Props {
  termError: boolean;
  handleTermError: (value: boolean) => void;
}

function ProjectDetailInfoSection({ termError, handleTermError }: Props) {
  const project = useProjectStore((state) => state.project);
  const updateProject = useProjectStore((state) => state.updateProjectField);

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateProject('startDate', value);
    handleTermError(false);
  };

  const handleFinishDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateProject('finishDate', value);
    handleTermError(false);
  };

  const handleTeammate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target) {
      updateProject('teammate', Number(event.target.value));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.inputLabel}>
        <p className={style.label}>
          <span>프로젝트 기간</span>
          <span className={style.requiredMark}>*</span>
        </p>
        <div className={`${style.termSection} ${termError && style.termError}`}>
          <div className={style.dateWrapper}>
            <p className={style.dateLabel}>시작일</p>
            <input
              className={style.dateInput}
              type="date"
              max={project.finishDate}
              value={project.startDate}
              onChange={handleStartDate}
            />
          </div>
          <span className={style.separator}>~</span>
          <div className={style.dateWrapper}>
            <p className={style.dateLabel}>종료일</p>
            <input
              className={style.dateInput}
              type="date"
              min={project.startDate}
              value={project.finishDate}
              onChange={handleFinishDate}
            />
          </div>
        </div>
      </div>

      {termError && (
        <span className={style.error}>
          프로젝트 기간을 확인해주세요(미입력/입력오류)
        </span>
      )}

      <div className={style.inputLabel}>
        <span className={style.label}>프로젝트 인원</span>
        <div>
          <select
            className={style.selectInput}
            value={project.teammate}
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
