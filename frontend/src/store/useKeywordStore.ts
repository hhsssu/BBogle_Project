import axios from 'axios';
import { create } from 'zustand';

const API_LINK = import.meta.env.VITE_API_URL;

export interface Keyword {
  id: number;
  type: boolean;
  name: string;
}

interface KeywordState {
  keywords: Keyword[];
  fetchKeywords: () => Promise<void>;
}

const useKeywordStore = create<KeywordState>((set) => ({
  keywords: [],

  // 키워드 리스트 가져오기
  fetchKeywords: async () => {
    try {
      // 키워드 불러오기 API 주소 재확인
      const response = await axios.get(`${API_LINK}/activites/keywords`);
      set({ keywords: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error('키워드 데이터를 가져오는 데 실패했습니다: ', error);
    }
  },
}));

export default useKeywordStore;
