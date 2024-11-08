import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../api/axiosInstance';

// 회원 정보 타입 정의
interface User {
  id: number;
  nickname: string;
  email: string;
  profileImage: string | null;
}

// 인증 여부 및 회원 관리 함수 타입 정의
interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isEditingNickname: boolean;
  fetchUser: () => void;
  kakaoLogout: () => void;
  setEditNickname: () => void;
  updateNickname: (nickname: string) => Promise<void>;
  updateProfile: (profile: string) => Promise<void>;
}

// 회원 정보 상태관리
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // TODO : 기본 더미 유저 데이터
      // user: null,
      // isAuthenticated: false,
      // isEditingNickname: false,
      user: {
        id: 4,
        nickname: '지혜',
        email: 'jihye@example.com',
        profileImage: 'src/assets/image/dummy/Profile.jpg',
      },
      isAuthenticated: true,
      isEditingNickname: false,

      // 유저 정보 가져오는 함수
      fetchUser: async () => {
        // 유저 닉네임 가져오기
        try {
          const response = await axiosInstance.get('/users/nickname');
          console.log('API 응답 데이터:', response);

          const userName = response.data.nickname;
          console.log('userName : ', userName);
          set({
            user: {
              id: 4,
              nickname: userName,
              email: 'jihye@example.com',
              profileImage: 'src/assets/image/dummy/Profile.jpg',
            },
            isAuthenticated: true,
          });
          console.log('닉네임 가져오기 성공:', userName);
        } catch (e) {
          console.error('닉네임 가져오기 실패 : ', e);
        }
      },

      // kakao logout 함수
      kakaoLogout: () => {
        // 로그아웃 시 상태 초기화
        set({ user: null, isAuthenticated: false });
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
