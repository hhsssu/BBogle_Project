import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchUserNickname, logoutUser } from '../api/AuthApi';
// 회원 정보 타입 정의
interface User {
  id: number | null;
  nickname: string;
  email: string | null;
  profileImage: string | null;
}

// 인증 여부 및 회원 관리 함수 타입 정의
interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isEditingNickname: boolean;
  fetchUser: () => void;
  logout: () => void;
  setEditNickname: () => void;
  updateNickname: (nickname: string) => Promise<void>;
  updateProfile: (profile: string) => Promise<void>;
}

// 회원 정보 상태관리
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isEditingNickname: false,

      // 유저 닉네임 가져오는 함수
      fetchUser: async () => {
        try {
          const nickname = await fetchUserNickname();

          set({
            user: {
              id: null,
              nickname: nickname,
              email: null,
              profileImage: null,
            },
            isAuthenticated: true,
          });
          console.log('닉네임 가져오기 성공:', nickname);
        } catch (e) {
          console.error('닉네임 가져오기 실패 : ', e);
        }
      },

      // kakao logout 함수
      logout: async () => {
        try {
          // 로그아웃 API 호출
          await logoutUser();

          // 로그아웃 시 상태 초기화
          set({ user: null, isAuthenticated: false });

          // TODO : 확인용
          console.log('로그아웃 성공');
        } catch (error) {
          console.error('로그아웃 처리 중 문제 발생 : ', error);
        }
      },

      // 닉네임 편집 모드 상태 관리 함수
      setEditNickname: () => {
        set((state) => ({ isEditingNickname: !state.isEditingNickname }));
      },

      // 회원 정보 수정 함수
      updateNickname: async (nickname: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, nickname } : state.user,
          isEditingNickname: false,
        }));
      },

      // 프로필 이미지 수정 함수
      updateProfile: async (profile: string) => {
        set((state) => ({
          user: state.user
            ? { ...state.user, profileImage: profile }
            : state.user,
        }));
      },
    }),
    {
      name: 'userStorage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useUserStore;
