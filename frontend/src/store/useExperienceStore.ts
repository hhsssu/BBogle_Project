import { create } from 'zustand';
import axios from 'axios';

import { Project } from './useProjectStore';
import { Keyword } from './useKeywordStore';

import DefaultProfile from '../assets/image/icon/DefaultProfile.svg';

const API_LINK = import.meta.env.VITE_API_URL;

interface Experience {
  exID: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  project: Project;
  keywords: Keyword[];
}

interface ExperienceState {
  experience: Experience;
  experiences: Experience[];
  setExperience: (exp: Experience[]) => void;
  updateExperienceField: (
    exID: number,
    field: string,
    value: string | string[] | number | boolean,
  ) => void;
  fetchExperiences: () => Promise<void>;
  fetchExperienceById: (exID: number) => Promise<void>;
}

const useExperienceStore = create<ExperienceState>((set) => ({
  experience: {
    exID: 0,
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    project: {
      pjtID: 0,
      imgSrc: DefaultProfile,
      title: '',
      summary: '',
      startDate: '',
      finishDate: '',
      teammate: 1,
      roles: [],
      techs: [],
      alarmState: false,
      alarmTime: '17:30',
    },
    keywords: [],
  },
  experiences: [],
  setExperience: (exp) => set(() => ({ experiences: exp })),

  // 경험 수정
  updateExperienceField: (exID, field, value) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        // 아이디로 경험 찾기
        exp.exID === exID ? { ...exp, [field]: value } : exp,
      ),
    })),

  // 경험 리스트 가져오기
  fetchExperiences: async () => {
    try {
      // 경험 데이터를 가져오는 API 호출
      const response = await axios.get(`${API_LINK}/activities/search`);
      set({ experiences: Array.isArray(response.data) ? response.data : [] }); // 가져온 데이터를 상태에 저장
    } catch (error) {
      console.error('경험 데이터를 가져오는 데 실패했습니다:', error);
    }
  },

  // 특정 경험 가져오기 (ID 검색)
  fetchExperienceById: async (exID) => {
    try {
      const response = await axios.get(`${API_LINK}/activities/${exID}`);
      const experience = response.data;
      set({ experience });
    } catch (error) {
      console.error(
        `경험 ID ${exID} 데이터를 가져오는 데 실패했습니다: `,
        error,
      );
    }
  },
}));

export default useExperienceStore;
