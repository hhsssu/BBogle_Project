import { useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { fetchUserNickname } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { isAuthenticated, setAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      const verifyUser = async () => {
        try {
          await fetchUserNickname();
          setAuthenticated(true);
          // navigate('/');
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            setAuthenticated(false);
          } else {
            console.error('알 수 없는 오류:', error);
          }
        }
      };
      verifyUser();
    }
  }, [isAuthenticated, setAuthenticated]);

  // 로그인 성공 시 메인 페이지로 리디렉션
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // 인증 완료 후에만 리디렉션
    }
  }, [isAuthenticated, navigate]);

  return { isAuthenticated };
};
