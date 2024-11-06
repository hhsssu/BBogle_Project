import style from './Onboarding.module.css';
import KakaoLogin from '../../assets/image/KakaoLogin.png';

function Onboarding() {
  const goToLogin = () => {
    // 리다이랙트 URL
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  return (
    <div className={style['onboarding-container']}>
      <img className={style['logo']} src="/Logo_bubbles.svg" alt="Logo" />
      <div className={style['description']}>
        매일의 기록으로, 자소서를 더 쉽게
      </div>
      <img
        className={style['kakao-login']}
        src={KakaoLogin}
        alt="Kakao Login"
        // kakaoLogin 처리 전
        // onClick={kakaoRedirect}
        onClick={goToLogin}
      />
    </div>
  );
}

export default Onboarding;
