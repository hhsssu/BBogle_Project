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

export const getQuestion = async () => {
  try {
    const response = await axiosInstance.get('/diaries/questions');

    return response.data;
  } catch (error) {
    console.log('질문 목록 가져오기 실패');
    console.log(error);
  }
};

// 개발일지 TITLE 생성 API
export const getDiaryTitle = async (
  questions: Question[],
  answers: string[],
) => {
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
  const formData = new FormData();

  formData.append(
    'request',
    new Blob(
      [
        JSON.stringify({
          title: diary.title,
          answers: diary.answers,
        }),
      ],
      { type: 'application/json' },
    ),
  );

  if (diary.images.length === 0) {
    formData.append(
      'files',
      new Blob([], { type: 'application/octet-stream' }),
    );
  } else {
    // 각 파일을 FormData에 개별적으로 추가
    diary.images.forEach((file) => {
      formData.append('files', file);
    });
  }

  await axiosInstance.post(`/projects/${projectId}/diaries`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const patchDiary = async (
  projectId: number,
  diaryId: number,
  diary: Diary,
) => {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob(
      [
        JSON.stringify({
          title: diary.title,
          answers: diary.answers,
        }),
      ],
      { type: 'application/json' },
    ),
  );

  if (diary.images.length === 0) {
    formData.append(
      'files',
      new Blob([], { type: 'application/octet-stream' }),
    );
  } else {
    // 각 파일을 FormData에 개별적으로 추가
    diary.images.forEach(async (file, i) => {
      const response = await fetch(file);
      const blob = await response.blob();

      // Blob을 File로 변환
      const image = new File([blob], `project_image_${i}.jpg`, {
        type: blob.type,
      });

      formData.append('files', image);
    });
  }

  try {
    await axiosInstance.patch(
      `/projects/${projectId}/diaries/${diaryId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (error) {
    console.log('개발일지 수정 실패');
    console.log(error);
  }
};

export const deleteDiary = async (projectId: number, diaryId: number) => {
  try {
    await axiosInstance.delete(`/projects/${projectId}/diaries/${diaryId}`);
  } catch (error) {
    console.log('개발일지 삭제 실패');
    console.log(error);
  }
};

// 오늘 작성한 개발일지 조회 API
export const fetchTodayDiary = async () => {
  try {
    const response = await axiosInstance.get('/diaries/today');
    return response.data.diaries;
  } catch (error) {
    console.error('오늘 작성한 개발일지 조회 중 문제 발생', error);
  }
};
