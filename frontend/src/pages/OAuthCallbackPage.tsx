import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const kakaoLogin = useUserStore((state) => state.kakaoLogin);
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      // Kakao 로그인 상태 업데이트를 위해 인가 코드를 전달
      kakaoLogin(code).then(() => {
        // 로그인 후 메인 페이지 또는 다른 페이지로 이동
        navigate('/main');
      });
    }
  }, [searchParams, kakaoLogin, navigate]);

  return <p>로그인 중입니다...</p>;
};

export default OAuthCallback;
