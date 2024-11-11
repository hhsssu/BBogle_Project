import { useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { fetchUserNickname } from '../api/authApi';

export const useAuth = () => {
  const { isAuthenticated, setAuthenticated } = useAuthStore();

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
        }
      };
      verifyUser();
    }
  }, [isAuthenticated, setAuthenticated]);

  return { isAuthenticated };
};
