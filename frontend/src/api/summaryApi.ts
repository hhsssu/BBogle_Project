// import axios from 'axios';
import axiosInstance from './axiosInstance';
// import useProjectStore from '../store/useProjectStore';

// 프로젝트 ID 가져오기
// TODO Invalid hook call 오류 발생하는 코드
// const projectId = useProjectStore((state) => state.project.projectId);

interface DiaryDetail {
  diaryId: number;
  title: string;
  createDate: string;
  answers: [
    {
      question: string;
      description: string;
      answer: string;
    },
  ];
  images: string[];
}

// 회고 가져오기
// export const fetchSummaryInfo = async () => {
//   try {
//     const response = await axiosInstance.get(`/projects/${projectId}/summary`);
//     return response.data;
//   } catch (error) {
//     console.error('프로젝트 회고 가져오기 실패: ', error);
//   }
// };

// // 회고 수동 생성
// export const createSummary = async (content: string) => {
//   try {
//     const response = await axiosInstance.post(
//       `/projects/${projectId}/summary`,
//       {
//         content: content,
//       },
//     );
//     console.log('회고 수동 생성 성공: ', response.data);
//   } catch (error) {
//     console.error('프로젝트 회고 수동 생성 실패: ', error);
//   }
// };

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

// 회고 AI 생성
export const createSummaryAi = async (projectId: number) => {
  const data = await axiosInstance.get(
    `/projects/${projectId}/diaries/details`,
  );

  const request = data.data.map((entry: DiaryDetail) => ({
    date: entry.createDate,
    summary: entry.title,
    daily_log: entry.answers,
  }));

  const response = await axiosInstance.post(
    '/rabbitmq/send/retrospective',
    request,
  );

  console.log(response.data.retrospective);

  // return response.data.retrospective;

  // TODO 경험 생성부분 테스트용
  const keywords = await axiosInstance.get('/keywords');

  const ExResponse = await axiosInstance.post('/rabbitmq/send/experience', {
    retrospective_content: response.data.retrospective,
    keywords: keywords.data.keywords,
  });

  console.log(ExResponse.data);

  // return response.data.retrospective;
};
