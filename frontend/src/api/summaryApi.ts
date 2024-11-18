import axiosInstance from './axiosInstance';

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

// ✅회고 가져오기
export const fetchSummaryInfo = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}/summary`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 회고 가져오기 실패: ', error);
  }
};

// ✅회고 수동 생성
export const createSummary = async (projectId: number, content: string) => {
  try {
    await axiosInstance.post(`/projects/${projectId}/summary`, {
      content: content,
    });
  } catch (error) {
    console.error('프로젝트 회고 수동 생성 실패: ', error);
  }
};

// ✅회고 수정
export const updateSummary = async (
  projectId: number,
  summaryId: number,
  content: string,
) => {
  try {
    await axiosInstance.patch(`/projects/${projectId}/summary/${summaryId}`, {
      content: content,
    });
  } catch (error) {
    console.error('프로젝트 회고 수정 실패: ', error);
  }
};

// ❗✅회고 AI 생성
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
    { timeout: 300000 }, // 5분 타임아웃
  );

  return response.data.retrospective;
};
