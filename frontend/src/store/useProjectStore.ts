import { create } from 'zustand';
import DefaultProject from '../assets/image/icon/DefaultProject.svg';
import RunnerWay from '../assets/image/RunnerWay.png';
import { persist } from 'zustand/middleware';
import { getProject, getProjectList } from '../api/projectApi';

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
  title: string;
  image: string;
  description: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  role: string[];
  skill: string[];
  status: boolean;
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

  // 프로젝트 생성/수정
  titleError: boolean;
  setTitleError: (value: boolean) => void;
  termError: boolean;
  setTermError: (value: boolean) => void;
  errMsgOn: boolean;
  setErrMsgOn: (value: boolean) => void;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      // 프로젝트 리스트
      projectList: [],
      getProjectList: async () => {
        const data = await getProjectList();
        set(() => ({ projectList: data }));
      },

      // 프로젝트 하나
      project: {
        projectId: -1,
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
            projectId: -1,
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
      getProject: async (pjtId) => {
        const data = await getProject(pjtId);
        set(() => ({
          project: data,
          // project: {
          //   image: RunnerWay,
          //   title: 'Runner Way',
          //   description: '당신의 러닝을 함께하는 프로젝트',
          //   status: true,
          //   startDate: '2024-10-03',
          //   endDate: '2024-11-30',
          //   memberCount: 6,
          //   role: ['FE', 'BE', 'INFRA', 'AI'],
          //   skill: ['React', 'Spring', 'TypeScript', 'JPA', 'MongoDB'],
          //   notificationStatus: true,
          //   notificationTime: {
          //     hour: 17,
          //     minute: 30,
          //     second: 0,
          //     nano: 0,
          //   },
          // },
        }));
      },
      updateProjectField: (field, value) =>
        set((state) => ({ project: { ...state.project, [field]: value } })),

      // 프로젝트 생성/수정
      titleError: false,
      setTitleError: (value) => set(() => ({ titleError: value })),
      termError: false,
      setTermError: (value) => set(() => ({ termError: value })),
      errMsgOn: false,
      setErrMsgOn: (value) => set(() => ({ errMsgOn: value })),
    }),
    {
      name: 'projectStorage',
      partialize: (state) => ({
        project: state.project,
      }),
    },
  ),
);

export default useProjectStore;
