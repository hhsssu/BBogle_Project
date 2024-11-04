import ExStyles from './Experience.module.css';

function ExUpdate() {
  return (
    <>
      <section className={ExStyles.between}>
        <div className={ExStyles.title}>경험 수정</div>
        <button className={ExStyles.regist}>수정 완료</button>
      </section>
    </>
  );
}

export default ExUpdate;
