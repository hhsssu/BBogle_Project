import axiosInstance from './axiosInstance';
import useProjectStore from '../store/useProjectStore';

// 회고 가져오기
export const fetchSummaryInfo = async () => {
  try {
    const projectId = useProjectStore((state) => state.project.projectId);
    const response = await axiosInstance.get(`/projects/${projectId}/summary`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 회고 가져오기 실패: ', error);
  }
};
