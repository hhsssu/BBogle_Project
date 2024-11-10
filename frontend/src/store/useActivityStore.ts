import { create } from 'zustand';
import axios from 'axios';

import { ActivityKeyword } from './useActivityKeywordStore';

const API_LINK = import.meta.env.VITE_API_URL;

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

  // 경험 작성
  setActivity: (act: Activity[]) => void;

  // 경험 수정
  updateActivity: (updatedActivity: Activity) => void;

  // 경험 목록 가져오기
  fetchActivities: () => Promise<void>;

  // 경험 ID로 상세 가져오기
  fetchActivityById: (activityId: number) => Promise<void>;
}

const useActivityStore = create<ActivityState>((set) => ({
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
  activities: [
    {
      activityId: 1,
      title: '소셜 로그인 구현1',
      content: `소셜로그인 기능 개발을 통해 사용자의 편의성과 보안성을 동시에 강화하는 경험을 했습니다. 구글과 카카오 소셜로그인을 구현하면서 API와 OAuth2 인증 방식을 학습하고 적용했습니다. 구글 로그인 기능은 시간을 절약하기 위해 사전에 정의된 액세스 토큰을 사용하여 사용자 정보를 얻는 방식으로 테스트를 진행하였습니다. 이를 통해 사용자 경험을 검증하고, 실제 환경에서도 안정적인 작동을 보장할 수 있었습니다. 또한 Redux를 사용해 로그인 상태와 토큰을 관리하여 데이터 흐름을 최적화하고, 중앙 집중식 상태 관리의 중요성을 체감했습니다. Redux Toolkit을 활용해 인증과 관련된 상태를 authSlice로 분리하여 코드의 가독성과 유지보수성을 향상시켰습니다. 이 과정에서 여러 사용자 환경을 고려한 UI/UX를 개선하고자 노력하였으며, 최종적으로 소셜로그인을 통해 서비스 접근성을 높이는 동시에 사용자 데이터를 안전하게 보호할 수 있는 시스템을 구축했습니다.
액세스 토큰의 유효성을 관리하고, 필요 시 재발급하는 로직을 추가해 사용자가 원활하게 로그인을 유지할 수 있도록 했습니다. 또한, 다양한 예외 상황을 대비해 에러 처리 방안을 마련하여 사용자 경험을 끊김 없이 유지할 수 있도록 했습니다. 이를 위해 Axios를 활용해 API 호출을 모듈화하고, 각 상황에 맞는 메시지를 출력해 사용자가 문제를 쉽게 이해하고 해결할 수 있도록 했습니다.`,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      projectId: 1,
      projectTitle: 'RunnerWay',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 2,
      title: '카카오 API를 이용한 로그인 구현2',
      content: '더미데이터입니다',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      projectId: 1,
      projectTitle: 'WON TOUCH!',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 3,
      title: '카카오 API를 이용한 로그인 구현3',
      content: '더미데이터입니다',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      projectId: 1,
      projectTitle: 'Challet',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 4,
      title: '카카오 API를 이용한 로그인 구현4',
      content: '더미데이터입니다',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      projectId: 1,
      projectTitle: 'Challet',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 5,
      title: '카카오 API를 이용한 로그인 구현5',
      content: '더미데이터입니다',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      projectId: 1,
      projectTitle: 'Challet',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 6,
      title: '카카오 API를 이용한 로그인 구현5',
      content: '더미데이터입니다',
      startDate: null,
      endDate: null,
      projectId: 1,
      projectTitle: 'Challet',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
    {
      activityId: 7,
      title: '카카오 API를 이용한 로그인 구현5',
      content: '더미데이터입니다',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      projectId: 1,
      projectTitle: 'Challet',
      keywords: [
        { id: 1, type: false, name: '기술1' },
        { id: 2, type: false, name: '기술2' },
        { id: 3, type: true, name: '인성1' },
      ],
    },
  ],
  setActivity: (act) => set(() => ({ activities: act })),

  // 경험 수정
  updateActivity: (updatedActivity) =>
    set((state) => ({
      activities: state.activities.map((act) =>
        // 아이디로 경험 찾기
        act.activityId === updatedActivity.activityId ? updatedActivity : act,
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
      const activity: Activity = response.data;

      // TODO 프로젝트 타이틀 가져오기
      // const projectResponse = await axios.get(
      //   `${API_LINK}/projects/${activity.projectId}`,
      // );
      // const projectTitle = projectResponse.data.title;
      const projectTitle = '프로젝트';

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
