import { create } from 'zustand';

interface Question {
  question: string;
  description: string;
}

interface DiaryState {
  // 개발일지 작성
  questionList: Question[];
  getQuestionList: () => void;
  answerList: string[];
  updateAnswer: (index: number, value: string) => void;

  // 개발일지 목록 조회
  sortIdx: number;
  setSortIdx: (idx: number) => void;
}

const useDiaryStore = create<DiaryState>((set) => ({
  // TODO 질문 문항 더미 리스트
  questionList: [
    {
      question: '어떤 작업을 하셨나요 ?',
      description: '구현한 기능이나 작업물에 대해 설명해주세요.',
    },
    {
      question: '작업 진행 중 힘든 점은 어떤 점이었나요 ?',
      description:
        '구현 중 어려웠던 부분이나 팀원과의 갈등 ... 어떤 것이든 적어보세요 !',
    },
    {
      question: '문제는 해결되었나요 ?',
      description:
        '해결하기 위해 실행한 노력들을 적어보세요 ! 아직 해결되지 않았다면, 고민한 내용을 적어도 좋아요.',
    },
  ],
  getQuestionList: () =>
    set(() => ({
      // axios.get()
    })),
  answerList: ['', '', '', ''],
  updateAnswer: (index, value) =>
    set((state) => ({
      answerList: state.answerList.map((answer, i) =>
        i === index ? value : answer,
      ),
    })),

  sortIdx: 0,
  setSortIdx: (idx) => set(() => ({ sortIdx: idx })),
}));

export default useDiaryStore;
