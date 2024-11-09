import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { fetchUserNickname } from '../api/authApi';

export const useAuth = () => {
  const { isAuthenticated, setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true); // 검증 중인 상태

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
          }
        } finally {
          setLoading(false); // 인증 검증이 끝나면 로딩 상태 해제
        }
      };
      verifyUser();
    } else {
      setLoading(false); // 이미 인증된 상태인 경우 로딩 해제
    }
  }, [isAuthenticated, setAuthenticated]);

  useEffect(() => {
    console.log('isAuthenticated 상태:', isAuthenticated);
  }, [isAuthenticated]);

  return { isAuthenticated, loading };
};
