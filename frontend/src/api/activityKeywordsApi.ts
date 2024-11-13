import axiosInstance from './axiosInstance';

// 키워드 불러오기
export const fetchActivityKeywords = async () => {
  try {
    const response = await axiosInstance.get('/keywords');
    return response.data.keywords;
  } catch (error) {
    console.error('경험 키워드 불러오기 실패: ', error);
  }
};
