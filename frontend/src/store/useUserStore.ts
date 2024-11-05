import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// REST API 및 redirectUri
const clientId = import.meta.env.VITE_KAKAO_API_KEY;
const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

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
  kakaoRedirect: () => void;
  kakaoLogin: (code: string) => Promise<void>;
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
        profileImage: 'src/assets/image/dummy/profile.jpg',
      },
      isAuthenticated: true,
      isEditingNickname: false,

      // kakao redirect 함수
      kakaoRedirect: () => {
        try {
          console.log(clientId);
          console.log(redirectUri);

          // 인가 코드 요청 URL로 리디렉션
          const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

          // 브라우저 리디렉션
          window.location.href = kakaoAuthUrl;

          console.log('인가 코드 요청 결과 ');
        } catch (error) {
          console.error('카카오 로그인 오류:', error);
          set({ isAuthenticated: false, user: null });
        }
      },

      // kakao login 함수
      kakaoLogin: async (code: string) => {
        try {
          // 액세스 토큰 요청
          const tokenResponse = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            null,
            {
              params: {
                grant_type: 'authorization_code',
                client_id: clientId,
                redirect_uri: redirectUri,
                code: code,
              },
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded;charset=utf-8',
              },
            },
          );

          const accessToken = tokenResponse.data.access_token;

          console.log(accessToken);
          // 사용자 정보 요청
          // const userResponse = await axi
        } catch (error) {
          console.error('카카오 로그인 오류 : ', error);
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
      name: 'user-storage', // localStorage에 저장될 키 이름
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useUserStore;
