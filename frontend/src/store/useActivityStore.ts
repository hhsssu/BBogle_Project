import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActivityKeyword } from './useActivityKeywordStore';
import {
  createActivity as createActivityApi,
  fetchActivities as fetchActivitiesApi,
  fetchActivityById as fetchActivityByIdApi,
  updateActivity as updateActivityApi,
  createActivityAi as CreateActivityAiApi,
} from '../api/activityApi';

export interface Activity {
  activityId: number;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  projectId: number | undefined;
  projectTitle?: string;
  keywords: ActivityKeyword[];
}

// 경험 검색 관련
interface SearchCriteria {
  word: string;
  keywords: number[];
  projects: number[];
}

interface ActivityState {
  // 경험 데이터 로딩 상태
  isActivityLoading: boolean;

  // 단일 경험
  activity: Activity;

  // 경험 목록
  activities: Activity[];

  // 해당 프로젝트의 경험 목록
  pjtActivities: Activity[];

  // 새로 생성된 프로젝트의 경험 목록
  newActivities: Activity[];

  // 경험 수동 생성
  createActivity: (activity: Activity) => void;

  // 경험 수정
  updateActivity: (activityId: number, activity: Activity) => void;

  // 경험 생성&수정 시 필드 수정
  updateActivityField: (
    field: string,
    value: string | Number[] | number,
  ) => void;

  // 경험 데이터 초기화
  resetActivity: () => void;

  // 검색 데이터 초기화
  resetSearchCriteria: () => void;

  // 경험 전체 리스트 & 검색
  fetchActivities: (
    word: string | null,
    keywords: number[],
    projects: number[],
  ) => void;

  // 경험 상세 (ID 검색)
  fetchActivityById: (activityId: number) => void;

  // 경험 검색 데이터
  searchCriteria: SearchCriteria;

  // 경험 검색 데이터 설정
  setSearchCriteria: (criteria: SearchCriteria) => void;

  // 경험 AI 생성
  createActivityAi: (content: string) => void;

  // 경험 AI에 쓰이는 프로젝트 관련 경험 리스트
  fetchPjtActivities: (word: null, keywords: [], projects: number[]) => void;

  // 경험 생성/수정 필수 확인
  // 빈 제목 에러
  titleError: boolean;
  setTitleError: (value: boolean) => void;
  // 빈 내용 에러
  contentError: boolean;
  setContentError: (value: boolean) => void;
  // 기간 설정 에러
  termError: boolean;
  setTermError: (value: boolean) => void;
  // 에러 메시지
  errMsgOn: boolean;
  setErrMsgOn: (value: boolean) => void;
}

const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      // 데이터 로딩 상태
      isActivityLoading: false,
      activity: {
        activityId: -1,
        title: '',
        content: '',
        startDate: new Date(),
        endDate: new Date(),
        projectId: undefined,
        projectTitle: '',
        keywords: [],
      },
      activities: [],
      pjtActivities: [],
      newActivities: [],

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
      // 경험 필드 수정
      updateActivityField: (field, value) =>
        set((state) => ({ activity: { ...state.activity, [field]: value } })),

      // 경험 데이터 초기화
      resetActivity: () =>
        set(() => ({
          activity: {
            activityId: -1,
            title: '',
            content: '',
            startDate: new Date(),
            endDate: new Date(),
            projectId: undefined,
            projectTitle: '',
            keywords: [],
          },
        })),

      // 경험 전체 리스트 & 검색
      fetchActivities: async (
        word: string | null,
        keywords: number[],
        projects: number[],
      ) => {
        set(() => ({ isActivityLoading: true }));
        const data = await fetchActivitiesApi(word, keywords, projects);
        set({ activities: data, isActivityLoading: false });
      },

      // 경험 상세 (ID 검색)
      fetchActivityById: async (activityId: number) => {
        set(() => ({ isActivityLoading: true }));
        const data = await fetchActivityByIdApi(activityId);
        set({ activity: data, isActivityLoading: false });
      },

      // 경험 검색 데이터
      searchCriteria: {
        word: '',
        keywords: [],
        projects: [],
      },
      setSearchCriteria: (criteria) => set({ searchCriteria: criteria }),

      resetSearchCriteria: () =>
        set(() => ({
          searchCriteria: { word: '', keywords: [], projects: [] },
        })),

      // 경험 AI 생성
      createActivityAi: async (content: string) => {
        set(() => ({ isActivityLoading: true }));
        const data = await CreateActivityAiApi(content);
        set({ newActivities: data, isActivityLoading: false });
      },

      // 경험 AI 생성에서 필요한 해당 프로젝트 관련 경험 리스트
      fetchPjtActivities: async (
        word: null,
        keywords: [],
        projects: number[],
      ) => {
        set(() => ({ isActivityLoading: true }));
        const data = await fetchActivitiesApi(word, keywords, projects);
        set({ pjtActivities: data, isActivityLoading: false });
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
        activities: state.activities,
        isActivityLoading: state.isActivityLoading,
      }),
    },
  ),
);

export default useActivityStore;
