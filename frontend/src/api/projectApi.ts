import axiosInstance from './axiosInstance';

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
  notificationTime: string;
}

export const getProjectList = async () => {
  try {
    const response = await axiosInstance.get('/projects');

    return response.data.projectList;
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
    console.log('프로젝트 가져오기 실패');
    console.log(error);
  }
};

export const addProject = async (project: Project) => {
  console.log(project);

  await axiosInstance.post('/projects', {
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

export const finishProject = async (projectId: number, content: string) => {
  try {
    await axiosInstance.patch(`/projects/${projectId}/end`, {
      content,
    });
  } catch (error) {
    console.log('프로젝트 종료 실패');
    console.log(error);
  }
};
