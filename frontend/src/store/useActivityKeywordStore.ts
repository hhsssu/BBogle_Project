import axios from 'axios';
import { create } from 'zustand';

const API_LINK = import.meta.env.VITE_API_URL;

export interface ActivityKeyword {
  id: number;
  type: boolean;
  name: string;
}

interface ActivityKeywordState {
  activityKeywords: ActivityKeyword[];
  fetchActivityKeywords: () => Promise<void>;
}

const useActivityKeywordStore = create<ActivityKeywordState>((set) => ({
  // TODO : 키워드 임시 데이터
  activityKeywords: [
    { id: 1, type: false, name: '사용자 경험 개선' },
    { id: 2, type: false, name: '코드 품질 향상' },
    { id: 3, type: false, name: '최적화' },
    { id: 4, type: false, name: '자동화' },
    { id: 5, type: false, name: '코드 리팩토링' },
    { id: 6, type: false, name: '전처리' },
    { id: 7, type: false, name: 'UI / UX' },
    { id: 8, type: false, name: '통신' },
    { id: 9, type: false, name: '서버' },
    { id: 10, type: false, name: '보안' },
    { id: 11, type: true, name: '도전정신' },
    { id: 12, type: true, name: '전문성' },
    { id: 13, type: true, name: '도덕성' },
    { id: 14, type: true, name: '창의성' },
    { id: 15, type: true, name: '협력' },
    { id: 16, type: true, name: '책임감' },
    { id: 17, type: true, name: '진취성' },
    { id: 18, type: true, name: '리더쉽' },
    { id: 19, type: true, name: '배려심' },
    { id: 20, type: true, name: '갈등' },
    { id: 21, type: true, name: '문제 해결' },
    { id: 22, type: true, name: '분석력' },
    { id: 23, type: true, name: '소통' },
    { id: 24, type: true, name: '성공 경험' },
    { id: 25, type: true, name: '실패 경험' },
    { id: 26, type: true, name: '열정' },
    { id: 27, type: true, name: '희생' },
    { id: 28, type: true, name: '끈기' },
  ],

  // 키워드 리스트 가져오기
  fetchActivityKeywords: async () => {
    try {
      // 키워드 불러오기 API 주소 재확인
      const response = await axios.get(`${API_LINK}/activites/keywords`);
      set({
        activityKeywords: Array.isArray(response.data) ? response.data : [],
      });
    } catch (error) {
      console.error('키워드 데이터를 가져오는 데 실패했습니다: ', error);
    }
  },
}));

export default useActivityKeywordStore;
