import { create } from 'zustand';
import DefaultProject from '../assets/image/icon/DefaultProject.svg';
import RunnerWay from '../assets/image/RunnerWay.png';

interface ProjectCard {
  id: number;
  imageSrc: string;
  title: string;
  state: boolean;
  term: string;
  summary: string;
}

export interface Project {
  pjtID: number;
  imgSrc: string;
  title: string;
  summary: string;
  startDate: string;
  finishDate: string;
  teammate: number;
  roles: string[];
  techs: string[];
  alarmState: boolean;
  alarmTime: string;
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
    value: string | string[] | number | boolean,
  ) => void;
}

const useProjectStore = create<ProjectState>((set) => ({
  // 프로젝트 리스트
  projectList: [],
  getProjectList: () =>
    set(() => ({
      projectList: [
        {
          id: 10,
          imageSrc: RunnerWay,
          title: 'Endurance Challenge',
          state: true,
          term: '2024.04.01 ~ 2024.06.30',
          summary: '한계를 극복하는 러닝 도전 프로젝트',
        },
        {
          id: 11,
          imageSrc: RunnerWay,
          title: 'Marathon Complete',
          state: false,
          term: '2024.01.01 ~ 2024.03.30',
          summary: '마라톤 완주를 위한 도전 프로젝트',
        },
        {
          id: 12,
          imageSrc: RunnerWay,
          title: 'Summer Sprint',
          state: false,
          term: '2024.06.01 ~ 2024.07.31',
          summary: '여름 동안 짧은 거리 러닝 훈련 프로젝트',
        },
        {
          id: 13,
          imageSrc: RunnerWay,
          title: 'City Night Run',
          state: false,
          term: '2023.11.05 ~ 2024.01.10',
          summary: '도심에서의 야간 러닝 체험 프로젝트',
        },
        {
          id: 14,
          imageSrc: RunnerWay,
          title: 'Trail Discoveries',
          state: false,
          term: '2024.03.15 ~ 2024.05.15',
          summary: '트레일 러닝으로 새로운 길을 탐험',
        },
        {
          id: 15,
          imageSrc: RunnerWay,
          title: 'Weekly 5K Challenge',
          state: false,
          term: '2023.09.01 ~ 2024.01.01',
          summary: '매주 5km 달리기 도전 프로젝트',
        },
        {
          id: 16,
          imageSrc: RunnerWay,
          title: 'Morning Marathoners',
          state: false,
          term: '2024.02.01 ~ 2024.04.01',
          summary: '아침 러닝을 즐기는 사람들을 위한 프로젝트',
        },
        {
          id: 17,
          imageSrc: RunnerWay,
          title: 'Speed Boost',
          state: false,
          term: '2024.08.01 ~ 2024.09.01',
          summary: '단기간 스피드 향상을 목표로 한 프로젝트',
        },
        {
          id: 18,
          imageSrc: RunnerWay,
          title: 'Endurance Build',
          state: false,
          term: '2023.12.01 ~ 2024.02.28',
          summary: '장거리 달리기로 지구력 강화 프로젝트',
        },
        {
          id: 19,
          imageSrc: RunnerWay,
          title: 'Rainy Day Run',
          state: false,
          term: '2024.05.01 ~ 2024.06.30',
          summary: '비 오는 날에도 러닝을 멈추지 않는 프로젝트',
        },
        {
          id: 20,
          imageSrc: RunnerWay,
          title: 'Marathon Prep Complete',
          state: false,
          term: '2024.03.01 ~ 2024.05.31',
          summary: '마라톤을 준비하는 모든 러너들의 여정',
        },
        {
          id: 21,
          imageSrc: RunnerWay,
          title: 'Park Run Adventures',
          state: false,
          term: '2024.07.01 ~ 2024.09.01',
          summary: '도시 공원을 탐방하며 달리기 즐기기',
        },
      ],
    })),
  project: {
    pjtID: 0,
    imgSrc: DefaultProject,
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
  setProject: (pjt) => set(() => ({ project: pjt })),
  initProject: () =>
    set(() => ({
      project: {
        pjtID: 0,
        imgSrc: DefaultProject,
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
    })),
  getProject: (pjtId) =>
    // axios.get(`/api/projects/${pjtId}`)
    set(() => ({
      project: {
        pjtID: pjtId,
        imgSrc: RunnerWay,
        title: 'Runner Way',
        summary: '당신의 러닝을 함께하는 프로젝트',
        startDate: '2024-10-03',
        finishDate: '2024-11-30',
        teammate: 6,
        roles: ['FE', 'BE', 'INFRA', 'AI'],
        techs: ['React', 'Spring', 'TypeScript', 'JPA', 'MongoDB'],
        alarmState: true,
        alarmTime: '17:30',
      },
    })),
  updateProjectField: (field, value) =>
    set((state) => ({ project: { ...state.project, [field]: value } })),
}));

export default useProjectStore;
