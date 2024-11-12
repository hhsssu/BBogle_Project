import axios from 'axios';
import axiosInstance from './axiosInstance';

interface Diary {
  title: string;
  answers: string[];
  images: string[];
}

interface Question {
  question: string;
  description: string;
}

export const getDiaryList = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}/diaries`);

    return response.data.diaryList;
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
export const getDiaryTitle = async (
  questions: Question[],
  answers: string[],
) => {
  console.log(questions);
  console.log(answers);

  const response = await axios.post(
    'http://localhost:8000/api/generate/title',
    [
      { question: questions[0].question, answer: answers[0] },
      { question: questions[1].question, answer: answers[1] },
      { question: questions[2].question, answer: answers[2] },
    ],
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(response);
  return response.data;
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
