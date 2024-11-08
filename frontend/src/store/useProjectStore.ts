import { create } from 'zustand';
import DefaultProject from '../assets/image/icon/DefaultProject.svg';
import RunnerWay from '../assets/image/RunnerWay.png';
import { persist } from 'zustand/middleware';

interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

interface ProjectCard {
  projectId: number;
  image: string;
  title: string;
  description: string;
  status: boolean;
  startDate: string;
  endDate: string;
  notificationStatus: boolean;
}

interface Project {
  projectId: number;
  image: string;
  title: string;
  description: string;
  status: boolean;
  startDate: string;
  endDate: string;
  memberCount: number;
  role: string[];
  skill: string[];
  notificationStatus: boolean;
  notificationTime: Time;
}

interface ProjectState {
  // 프로젝트 리스트
  projectList: ProjectCard[];
  getProjectList: () => void;

  // 프로젝트 하나
  project: Project;
  setProject: (pjt: Project) => void;
  initProject: () => void;
  getProject: (pjtId: number) => void;
  updateProjectField: (
    field: string,
    value: string | string[] | number | boolean | Time,
  ) => void;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      // 프로젝트 리스트
      projectList: [],
      getProjectList: () =>
        set(() => ({
          projectList: [
            {
              projectId: 10,
              image: RunnerWay,
              title: 'Endurance Challenge',
              description: '한계를 극복하는 러닝 도전 프로젝트',
              status: true,
              startDate: '2024-04-01',
              endDate: '2024-06-30',
              notificationStatus: true,
            },
            {
              projectId: 11,
              image: RunnerWay,
              title: 'Marathon Complete',
              description: '마라톤 완주를 위한 도전 프로젝트',
              status: false,
              startDate: '2024-01-01',
              endDate: '2024-03-30',
              notificationStatus: true,
            },
            {
              projectId: 12,
              image: RunnerWay,
              title: 'Summer Sprint',
              description: '여름 동안 짧은 거리 러닝 훈련 프로젝트',
              status: false,
              startDate: '2024-06-01',
              endDate: '2024-07-31',
              notificationStatus: false,
            },
            {
              projectId: 13,
              image: RunnerWay,
              title: 'City Night Run',
              description: '도심에서의 야간 러닝 체험 프로젝트',
              status: false,
              startDate: '2023-11-05',
              endDate: '2024-01-10',
              notificationStatus: false,
            },
            {
              projectId: 14,
              image: RunnerWay,
              title: 'Trail Discoveries',
              description: '트레일 러닝으로 새로운 길을 탐험',
              status: false,
              startDate: '2024-03-15',
              endDate: '2024-05-15',
              notificationStatus: false,
            },
            {
              projectId: 15,
              image: RunnerWay,
              title: 'Weekly 5K Challenge',
              description: '매주 5km 달리기 도전 프로젝트',
              status: false,
              startDate: '2023-09-01',
              endDate: '2024-01-01',
              notificationStatus: false,
            },
            {
              projectId: 16,
              image: RunnerWay,
              title: 'Morning Marathoners',
              description: '아침 러닝을 즐기는 사람들을 위한 프로젝트',
              status: false,
              startDate: '2024-02-01',
              endDate: '2024-04-01',
              notificationStatus: false,
            },
            {
              projectId: 17,
              image: RunnerWay,
              title: 'Speed Boost',
              description: '단기간 스피드 향상을 목표로 한 프로젝트',
              status: false,
              startDate: '2024-08-01',
              endDate: '2024-09-01',
              notificationStatus: false,
            },
            {
              projectId: 18,
              image: RunnerWay,
              title: 'Endurance Build',
              description: '장거리 달리기로 지구력 강화 프로젝트',
              status: false,
              startDate: '2023-12-01',
              endDate: '2024-02-28',
              notificationStatus: false,
            },
            {
              projectId: 19,
              image: RunnerWay,
              title: 'Rainy Day Run',
              description: '비 오는 날에도 러닝을 멈추지 않는 프로젝트',
              status: false,
              startDate: '2024-05-01',
              endDate: '2024-06-30',
              notificationStatus: false,
            },
            {
              projectId: 20,
              image: RunnerWay,
              title: 'Marathon Prep Complete',
              description: '마라톤을 준비하는 모든 러너들의 여정',
              status: false,
              startDate: '2024-03-01',
              endDate: '2024-05-31',
              notificationStatus: false,
            },
            {
              projectId: 21,
              image: RunnerWay,
              title: 'Park Run Adventures',
              description: '도시 공원을 탐방하며 달리기 즐기기',
              status: false,
              startDate: '2024-07-01',
              endDate: '2024-09-01',
              notificationStatus: false,
            },
          ],
        })),

      // 프로젝트 하나
      project: {
        projectId: 0,
        image: DefaultProject,
        title: '',
        description: '',
        status: false,
        startDate: '',
        endDate: '',
        memberCount: 1,
        role: [],
        skill: [],
        notificationStatus: false,
        notificationTime: {
          hour: 17,
          minute: 30,
          second: 0,
          nano: 0,
        },
      },
      setProject: (pjt) => set(() => ({ project: pjt })),
      initProject: () =>
        set(() => ({
          project: {
            projectId: 0,
            image: DefaultProject,
            title: '',
            description: '',
            status: false,
            startDate: '',
            endDate: '',
            memberCount: 1,
            role: [],
            skill: [],
            notificationStatus: false,
            notificationTime: {
              hour: 17,
              minute: 30,
              second: 0,
              nano: 0,
            },
          },
        })),
      getProject: (pjtId) =>
        // axios.get(`/api/projects/${pjtId}`)
        set(() => ({
          project: {
            projectId: pjtId,
            image: RunnerWay,
            title: 'Runner Way',
            description: '당신의 러닝을 함께하는 프로젝트',
            status: true,
            startDate: '2024-10-03',
            endDate: '2024-11-30',
            memberCount: 6,
            role: ['FE', 'BE', 'INFRA', 'AI'],
            skill: ['React', 'Spring', 'TypeScript', 'JPA', 'MongoDB'],
            notificationStatus: true,
            notificationTime: {
              hour: 17,
              minute: 30,
              second: 0,
              nano: 0,
            },
          },
        })),
      updateProjectField: (field, value) =>
        set((state) => ({ project: { ...state.project, [field]: value } })),
    }),
    {
      name: 'projectStorage',
      partialize: (state) => ({
        projectTitle: state.project.title,
      }),
    },
  ),
);

export default useProjectStore;
