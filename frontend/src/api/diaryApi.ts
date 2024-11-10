import axios from 'axios';
import axiosInstance from './axiosInstance';

interface Diary {
  title: string;
  answers: string[];
  images: string[];
}

export const getDiaryList = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}/diaries`);

    return response.data;
  } catch (error) {
    console.log('개발일지 목록 가져오기 실패');
    console.log(error);
  }
};

export const getDiary = async (projectId: number, diaryId: number) => {
  try {
    const response = await axiosInstance.get(
      `/projects/${projectId}/diaries/${diaryId}`,
    );

    return response.data;
  } catch (error) {
    console.log('개발일지 가져오기 실패');
    console.log(error);
  }
};

// 개발일지 TITLE 생성 API
export const getDiaryTitle = async (answers: string[]) => {
  try {
    const response = await axios.post('FAST API 주소', { answers: answers });

    return response.data;
  } catch (error) {
    console.log('개발일지 제목 생성 실패');
    console.log(error);

    return '';
  }
};

export const addDiary = async (projectId: number, diary: Diary) => {
  try {
    const response = await axiosInstance.post(
      `/projects/${projectId}/diaries`,
      {
        diary,
      },
    );

    return response.status;
  } catch (error) {
    console.log('개발일지 등록 실패');
    console.log(error);
  }
};

export const patchDiary = async (
  projectId: number,
  diaryId: number,
  diary: Diary,
) => {
  try {
    const response = await axiosInstance.patch(
      `/projects/${projectId}/diaries/${diaryId}`,
      {
        title: diary.title,
        answers: diary.answers,
        images: diary.images,
      },
    );

    return response.status;
  } catch (error) {
    console.log('개발일지 수정 실패');
    console.log(error);
  }
};

export const deleteDiary = async (projectId: number, diaryId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/projects/${projectId}/diaries/${diaryId}`,
    );

    return response.status;
  } catch (error) {
    console.log('개발일지 삭제 실패');
    console.log(error);
  }
};
