import { create } from 'zustand';
import { getDiary, getDiaryList, getQuestion } from '../api/diaryApi';
import { unstable_batchedUpdates } from 'react-dom';

interface Question {
  id: number;
  question: string;
  description: string;
}
interface QuestionAnswer {
  question: string;
  description: string;
  answer: string;
}

interface Diary {
  diaryId: string;
  title: string;
  createDate: string;
}

interface DiaryInfo {
  diaryId: number;
  title: string;
  createDate: string;
  answers: QuestionAnswer[];
  images: string[];
}

interface DiaryState {
  // 로딩 대기
  isLoading: boolean;

  // 개발일지 전체 목록 조회
  diaryList: Diary[];
  getDiaryList: (pjtId: number) => void;

  // 개발일지 전체 목록 조회 - 정렬
  sortIdx: number;
  setSortIdx: (idx: number) => void;

  // 개발일지 상세 조회
  diary: DiaryInfo;
  getDiaryDetail: (pjtId: number, diaryId: number) => void;

  // 개발일지 작성 시, 질문/대답 초기화
  initDiary: () => void;

  // 개발일지 상세 조회 데이터 분리 저장, 생성/수정할 때 사용
  title: string;
  questionList: Question[];
  answerList: string[];
  imageUrlList: string[];
  imageFileList: File[];

  // title, answer 변동 시 활용
  updateTitle: (value: string) => void;
  updateAnswer: (index: number, value: string) => void;
  updateImgUrl: (value: string) => void;
  updateImgFile: (value: File) => void;
  deleteImage: (index: number) => void;
}

const useDiaryStore = create<DiaryState>((set) => ({
  // 로딩 대기
  isLoading: false,

  // 개발일지 전체 목록 조회
  diaryList: [],
  getDiaryList: async (pjtId) => {
    const data = await getDiaryList(pjtId);
    set(() => ({ diaryList: data }));
  },

  // 개발일지 전체 목록 조회 - 정렬
  sortIdx: 0,
  setSortIdx: (idx) => set(() => ({ sortIdx: idx })),

  // 개발일지 상세 조회
  diary: {
    diaryId: -1,
    title: '',
    createDate: '',
    answers: [],
    images: [],
  },
  getDiaryDetail: async (pjtId, diaryId) => {
    set(() => ({ isLoading: true }));

    const data = await getDiary(pjtId, diaryId);
    const questions = data.answers.map((qna: QuestionAnswer, i: number) => {
      return { id: i, question: qna.question, description: qna.description };
    });
    const answers = data.answers.map((qna: QuestionAnswer) => {
      return qna.answer;
    });

    if (data.images) {
      set(() => ({ imageFileList: [] }));

      data.images.map(async (image: string) => {
        const response = await fetch(image);
        const blob = await response.blob();

        // Blob을 File로 변환
        const file = new File([blob], 'project_image.jpg', {
          type: blob.type,
        });

        set((state) => ({ imageFileList: [...state.imageFileList, file] }));
      });
    }

    unstable_batchedUpdates(() => {
      set(() => ({
        // diary: data,
        title: data.title,
        questionList: questions,
        answerList: answers,
        imageUrlList: data.images,
      }));
    });

    set(() => ({ isLoading: false }));
  },

  // 개발일지 작성 시, 질문/대답 초기화
  initDiary: async () => {
    set(() => ({ isLoading: true }));

    const data = await getQuestion();

    set(() => ({
      title: '',
      questionList: data,
      answerList: ['', '', ''],
      imageUrlList: [],
      imageFileList: [],
    }));
    set(() => ({ isLoading: false }));
  },

  // 개발일지 작성 시 데이터 저장 => 등록 시 활용
  title: '',
  questionList: [
    { id: 0, question: '', description: '' },
    { id: 1, question: '', description: '' },
    { id: 2, question: '', description: '' },
  ],
  answerList: ['', '', ''],
  imageUrlList: [],
  imageFileList: [],

  // title, answer 변동 시 활용
  updateTitle: (value) =>
    set(() => ({
      title: value,
    })),
  updateAnswer: (index, value) =>
    set((state) => ({
      answerList: state.answerList.map((answer, i) =>
        i === index ? value : answer,
      ),
    })),
  updateImgUrl: (value) =>
    set((state) => ({
      imageUrlList: [...state.imageUrlList, value],
    })),
  updateImgFile: (value) =>
    set((state) => ({
      imageFileList: [...state.imageFileList, value],
    })),
  deleteImage: (index) =>
    set((state) => ({
      imageUrlList: state.imageUrlList.filter((_, i) => i !== index),
      imageFileList: state.imageFileList.filter((_, i) => i !== index),
    })),
}));

export default useDiaryStore;
