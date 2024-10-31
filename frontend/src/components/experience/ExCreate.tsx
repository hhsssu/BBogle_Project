import ExStyles from './Experience.module.css';

function ExCreate() {
  return (
    <>
      <section className={ExStyles.between}>
        <div className={ExStyles.title}>경험 작성</div>
        <button className={ExStyles.regist}>등록하기</button>
      </section>
    </>
  );
}

export default ExCreate;
