import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActivityKeyword } from './useActivityKeywordStore';
import {
  createActivity as createActivityApi,
  // updateActivity as updateActivityApi,
  fetchActivities as fetchActivitiesApi,
  fetchActivityById as fetchActivityByIdApi,
} from '../api/activityApi';

export interface Activity {
  activityId: number;
  title: string;
  content: string;
  startDate: Date | null;
  endDate: Date | null;
  projectId: number;
  projectTitle?: string;
  keywords: ActivityKeyword[];
}

interface ActivityState {
  // 단일 경험
  activity: Activity;

  // 경험 목록
  activities: Activity[];

  // 경험 수동 생성
  createActivity: (activity: Activity) => void;

  // TODO 경험 수정
  // updateActivity: (activity: Activity) => void;

  // 경험 전체 리스트 & 검색
  fetchActivities: () => void;

  // 경험 상세 (ID 검색)
  fetchActivityById: (activityId: number) => void;
}

const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activity: {
        activityId: 0,
        title: '',
        content: '',
        startDate: null,
        endDate: null,
        projectId: 0,
        projectTitle: '',
        keywords: [],
      },

      activities: [],

      // 경험 수동 생성
      createActivity: async (activity: Activity) => {
        const newActivity = await createActivityApi(activity);
        set((state) => ({
          activities: [...state.activities, newActivity],
        }));
      },

      // TODO 경험 수정
      // updateActivity:,

      // 경험 전체 리스트 & 검색
      fetchActivities: async () => {
        const data = await fetchActivitiesApi();
        set({ activities: data || [] });
      },

      // 경험 상세 (ID 검색)
      fetchActivityById: async (activityId: number) => {
        const data = await fetchActivityByIdApi(activityId);
        set({ activity: data });
      },
    }),
    {
      name: 'activityStorage',
      partialize: (state) => ({
        activity: state.activity,
      }),
    },
  ),
);

export default useActivityStore;
