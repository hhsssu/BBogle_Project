import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActivityKeyword } from './useActivityKeywordStore';
import {
  createActivity as createActivityApi,
  fetchActivities as fetchActivitiesApi,
  fetchActivityById as fetchActivityByIdApi,
  updateActivity as updateActivityApi,
} from '../api/activityApi';

export interface Activity {
  activityId?: number | undefined;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  projectId?: number | undefined;
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
  updateActivity: (activityId: number, activity: Activity) => void;

  // 경험 전체 리스트 & 검색
  fetchActivities: () => void;

  // 경험 상세 (ID 검색)
  fetchActivityById: (activityId: number) => void;

  // 경험 생성/수정 필수 확인
  // 빈 제목 에러
  titleError: boolean;
  setTitleError: (value: boolean) => void;
  // 빈 내용 에러
  contentError: boolean;
  setContentError: (value: boolean) => void;
  // 시작기간이 종료기간보다 뒤일 때 에러
  termError: boolean;
  setTermError: (value: boolean) => void;
  // 에러 메시지
  errMsgOn: boolean;
  setErrMsgOn: (value: boolean) => void;
}

const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activity: {
        activityId: 0,
        title: '',
        content: '',
        startDate: new Date(),
        endDate: new Date(),
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

      // 경험 수정
      updateActivity: async (activityId: number, activity: Activity) => {
        const updateActivity = await updateActivityApi(activityId, activity);
        set((state) => ({
          activities: state.activities.map((act) =>
            act.activityId === activityId ? { ...act, ...updateActivity } : act,
          ),
        }));
      },

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

      // 경험 생성/수정 필수 확인
      titleError: false,
      setTitleError: (value) => set(() => ({ titleError: value })),
      contentError: false,
      setContentError: (value) => set(() => ({ contentError: value })),
      termError: false,
      setTermError: (value) => set(() => ({ termError: value })),
      errMsgOn: false,
      setErrMsgOn: (value) => set(() => ({ errMsgOn: value })),
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
