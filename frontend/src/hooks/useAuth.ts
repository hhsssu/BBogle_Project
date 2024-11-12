import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { fetchUserNickname } from '../api/authApi';

export const useAuth = () => {
  const { isAuthenticated, setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      const verifyUser = async () => {
        try {
          await fetchUserNickname();
          setAuthenticated(true);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            setAuthenticated(false);
          } else {
            console.error('알 수 없는 오류:', error);
            setAuthenticated(false);
          }
        } finally {
          setLoading(false);
        }
      };
      verifyUser();
    } else {
      setLoading(false); // 인증된 경우 바로 로딩 상태 해제
    }
  }, [isAuthenticated, setAuthenticated]);

  return { isAuthenticated, loading };
};
