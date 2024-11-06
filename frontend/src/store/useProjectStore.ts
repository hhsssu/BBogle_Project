import { create } from 'zustand';
import DefaultProject from '../assets/image/icon/DefaultProject.svg';
import RunnerWay from '../assets/image/RunnerWay.png';

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
