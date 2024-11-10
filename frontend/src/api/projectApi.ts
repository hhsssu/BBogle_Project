import axiosInstance from './axiosInstance';

interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

interface Project {
  title: string;
  image: string;
  description: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  role: string[];
  skill: string[];
  notificationStatus: boolean;
  notificationTime: Time;
}

export const getProjectList = async () => {
  try {
    const response = await axiosInstance.get('/projects');
    return response.data;
  } catch (error) {
    console.log('프로젝트 목록 가져오기 실패');
    console.log(error);
  }
};

export const getProject = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}`);

    return response.data;
  } catch (error) {
    console.log('개발일지 가져오기 실패');
    console.log(error);
  }
};

export const addProject = async (project: Project) => {
  try {
    const response = await axiosInstance.post(`/projects`, {
      project,
    });

    return response.status;
  } catch (error) {
    console.log('프로젝트 생성 실패');
    console.log(error);
  }
};

export const changeNotificationStatus = async (projectId: number) => {
  try {
    const response = await axiosInstance.patch(
      `/projects/${projectId}/notification`,
    );

    return response.status;
  } catch (error) {
    console.log('알림 ON/OFF 설정 변경 실패');
    console.log(error);
  }
};

export const patchProject = async (projectId: number, project: Project) => {
  try {
    const response = await axiosInstance.patch(
      `/projects/${projectId}`,
      project,
    );

    return response.status;
  } catch (error) {
    console.log('개발일지 수정 실패');
    console.log(error);
  }
};

export const deleteProject = async (projectId: number) => {
  try {
    const response = await axiosInstance.delete(`/projects/${projectId}`);

    return response.status;
  } catch (error) {
    console.log('개발일지 삭제 실패');
    console.log(error);
  }
};

export const finishProject = async (projectId: number, content: string) => {
  try {
    const response = await axiosInstance.patch(`/projects/${projectId}/end`, {
      content,
    });

    return response.status;
  } catch (error) {
    console.log('프로젝트 종료 실패');
    console.log(error);
  }
};
