import style from './Main.module.css';
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie/Welcome.json';

function Main() {
  // TODO : 임시데이터
  const userName = '홍길동';

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
          className={style.welcome}
        />
        <div className={style.greeting}>안녕하세요, {userName}님!</div>
      </div>

      <div className={style.diary}>
        <div className={style.description}>
          <div className={style.mainDescription}>
            오늘의 성장 기록을 남겨보세요 :-)
          </div>
          <div className={style.subDescription}>
            개발한 프로젝트를 선택해주세요 !
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Main;
