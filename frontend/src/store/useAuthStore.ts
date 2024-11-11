import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutUser } from '../api/authApi';

interface AuthStore {
  isAuthenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      setAuthenticated: (auth) => set({ isAuthenticated: auth }),

      logout: async () => {
        try {
          await logoutUser();
          set({ isAuthenticated: false });
          console.log('로그아웃 성공');

          // accessToken 및 기타 인증 관련 데이터를 localStorage에서 삭제
          localStorage.clear();
        } catch (error) {
          console.error('로그아웃 처리 중 문제 발생 : ', error);
        }
      },
    }),
    {
      name: 'authStorage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
