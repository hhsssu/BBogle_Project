import KakaoLogin from '../../assets/image/KakaoLogin.png';
import style from './Onboarding.module.css';

function Onboarding() {
  return (
    <>
      <div>매일의 기록으로, 자소서를 더 쉽게</div>
      <img className={style['kakao-login']} src={KakaoLogin} alt="Kakao Login" />
    </>
  )
}

export default Onboarding;