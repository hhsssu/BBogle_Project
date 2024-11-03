import { create } from 'zustand';
import DefaultProfile from '../assets/image/icon/DefaultProfile.svg';

interface Project {
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
  updateProjectField: (
    field: string,
    value: string | string[] | number | boolean,
  ) => void;
}

const useProjectStore = create<ProjectState>((set) => ({
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
  setProject: (pjt) => set(() => ({ project: pjt })),
  updateProjectField: (field, value) =>
    set((state) => ({ project: { ...state.project, [field]: value } })),
}));

export default useProjectStore;
