import axios from 'axios';
import axiosInstance from './axiosInstance';

interface Project {
  title: string;
  image: string | null;
  description: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  role: string[];
  skill: string[];
  notificationStatus: boolean;
  notificationTime: string;
}

export const getProjectList = async () => {
  try {
    const response = await axiosInstance.get('/projects');

    return response.data.projectList;
  } catch (error) {
    console.log('프로젝트 목록 가져오기 실패');
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (error.response!.status) {
        return [];
      }
    }
  }
};

// 진행중인 프로젝트 조회 API
export const getProgressProjectList = async () => {
  try {
    const response = await axiosInstance.get('/projects/in-progress');
    return response?.data.projectList;
  } catch (error) {
    console.error('진행 중인 프로젝트 목록 조회 중 문제 발생 : ', error);
  }
};

export const getProject = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}`);

    return response.data;
  } catch (error) {
    console.log('프로젝트 가져오기 실패');
    console.log(error);
  }
};

export const addProject = async (project: Project, file: File | null) => {
  console.log(project);
  const formData = new FormData();

  // JSON 데이터를 FormData에 추가
  formData.append(
    'request',
    new Blob(
      [
        JSON.stringify({
          title: project.title,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          memberCount: project.memberCount,
          role: project.role,
          skill: project.skill,
          notificationStatus: project.notificationStatus,
          notificationTime: project.notificationTime,
        }),
      ],
      { type: 'application/json' },
    ),
  );

  // 파일을 FormData에 추가
  formData.append(
    'file',
    file || new Blob([], { type: 'application/octet-stream' }),
  );

  // axios 요청 보내기
  await axiosInstance.post('/projects', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const changeNotificationStatus = async (
  projectId: number,
  status: boolean,
) => {
  await axiosInstance.patch(`/projects/${projectId}/notification`, {
    status: status,
  });
};

export const patchProject = async (projectId: number, project: Project) => {
  console.log(project);

  const response = await axiosInstance.patch(`/projects/${projectId}`, {
    title: project.title,
    image: project.image,
    description: project.description,
    startDate: project.startDate,
    endDate: project.endDate,
    memberCount: project.memberCount,
    role: project.role,
    skill: project.skill,
    notificationStatus: project.notificationStatus,
    notificationTime: project.notificationTime,
  });

  return response.status;
};

export const deleteProject = async (projectId: number) => {
  await axiosInstance.delete(`/projects/${projectId}`);
};

export const finishProject = async (projectId: number) => {
  try {
    await axiosInstance.patch(`/projects/${projectId}/end`);
  } catch (error) {
    console.log('프로젝트 종료 실패');
    console.log(error);
  }
};
