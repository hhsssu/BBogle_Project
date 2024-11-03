import style from './QuestionSection.module.css';

interface Props {
  index: number;
  question: string;
  description: string;
  isFileType: boolean;
}

function QuestionSection({
  index,
  question,
  description,
  isFileType = false,
}: Props) {
  return (
    <div className={style.inputSection}>
      <div className={style.questionSection}>
        <div className={style.outerCircle}>
          <div className={style.innerCircle}>{index}</div>
          {isFileType ? '' : <div className={style.line}></div>}
        </div>
        <span className={style.question}>{question}</span>
      </div>

      <p className={style.description}>{description}</p>
      {isFileType ? (
        <input className={style.textArea} type="file"></input>
      ) : (
        <textarea className={style.textArea}></textarea>
      )}
    </div>
  );
}

export default QuestionSection;
