import { create } from 'zustand';
import axios from 'axios';

import { Keyword } from './useKeywordStore';

const API_LINK = import.meta.env.VITE_API_URL;

export interface ActivityFormData {
  activityId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  selectedOptions: { id: number; type: boolean; name: string }[];
  projectId: number | null;
}

interface Activity {
  activityId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  projectId: number;
  projectTitle?: string;
  keywords: Keyword[];
}

interface ActivityState {
  activity: Activity;
  activities: Activity[];
  setActivity: (act: Activity[]) => void;
  updateActivityField: (
    activityId: number,
    field: string,
    value: string | string[] | number | boolean,
  ) => void;
  fetchActivities: () => Promise<void>;
  fetchActivityById: (activityId: number) => Promise<void>;
}

const useActivityStore = create<ActivityState>((set) => ({
  activity: {
    activityId: 0,
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    projectId: 0,
    projectTitle: '',
    keywords: [],
  },
  activities: [],
  setActivity: (act) => set(() => ({ activities: act })),

  // 경험 수정
  updateActivityField: (activityId, field, value) =>
    set((state) => ({
      activities: state.activities.map((act) =>
        // 아이디로 경험 찾기
        act.activityId === activityId ? { ...act, [field]: value } : act,
      ),
    })),

  // 경험 리스트 가져오기
  fetchActivities: async () => {
    try {
      // 경험 데이터를 가져오는 API 호출
      const response = await axios.get(`${API_LINK}/activities/search`);
      set({ activities: Array.isArray(response.data) ? response.data : [] }); // 가져온 데이터를 상태에 저장
    } catch (error) {
      console.error('경험 데이터를 가져오는 데 실패했습니다:', error);
    }
  },

  // 특정 경험 가져오기 (ID 검색)
  fetchActivityById: async (activityId) => {
    try {
      const response = await axios.get(`${API_LINK}/activities/${activityId}`);
      const activity = response.data;

      // 프로젝트 타이틀 가져오기
      const projectResponse = await axios.get(
        `${API_LINK}/projects/${activity.projectId}`,
      );
      const projectTitle = projectResponse.data.title;

      set({ activity: { ...activity, projectTitle } });
    } catch (error) {
      console.error(
        `경험 ID ${activityId} 데이터를 가져오는 데 실패했습니다: `,
        error,
      );
    }
  },
}));

export default useActivityStore;
