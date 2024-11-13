import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActivityKeyword } from './useActivityKeywordStore';
import {
  createActivity,
  updateActivity,
  fetchActivities,
  fetchActivityById,
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
  fetchActivityById: () => void;
}

const useActivityStore = create<ActivityState>()(
  persist((set) => ({
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
  })),
);

export default useActivityStore;
