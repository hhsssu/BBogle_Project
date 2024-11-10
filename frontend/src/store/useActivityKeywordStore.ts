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
  // TODO 더미데이터 삭제
  activityKeywords: [
    { id: 1, type: false, name: '기술1' },
    { id: 2, type: false, name: '기술2' },
    { id: 3, type: false, name: '기술3' },
    { id: 4, type: true, name: '인성1' },
    { id: 5, type: true, name: '인성2' },
    { id: 6, type: true, name: '인성3' },
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
