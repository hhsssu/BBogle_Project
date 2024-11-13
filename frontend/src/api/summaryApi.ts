import axiosInstance from './axiosInstance';
import useProjectStore from '../store/useProjectStore';

// 프로젝트 ID 가져오기
const projectId = useProjectStore((state) => state.project.projectId);

// 회고 가져오기
export const fetchSummaryInfo = async () => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}/summary`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 회고 가져오기 실패: ', error);
  }
};

// 회고 수동 생성
export const createSummary = async (content: string) => {
  try {
    const response = await axiosInstance.post(
      `/projects/${projectId}/summary`,
      {
        content: content,
      },
    );
    console.log('회고 수동 생성 성공: ', response.data);
  } catch (error) {
    console.error('프로젝트 회고 수동 생성 실패: ', error);
  }
};

// TODO 회고 ID?
// 회고 수정
// export const updateSummary = async (content: string) => {
// try {
// const response = await axiosInstance.patch(
//   `/projects/${projectId}/summary/${summaryId}`,
//   {
//     content: content,
//   },
// );
// console.log('회고 수정 성공: ', response.data);
//   } catch (error) {
//     console.error('프로젝트 회고 수정 실패: ', error);
//   }
// };
