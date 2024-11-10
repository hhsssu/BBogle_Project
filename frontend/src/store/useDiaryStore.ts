import { create } from 'zustand';

interface Question {
  question: string;
  description: string;
}

// {
//   "diaryId": 0,
//   "title": "string",
//   "answers": [
//     "string"
//   ],
//   "images": [
//     "string"
//   ]
// }

interface DiaryState {
  // 개발일지 작성, 수정 및 상세 조회 - qna list
  questionList: Question[];
  title: string;
  answers: string[];
  getQnaList: () => void;
  initQnaList: () => void;
  updateAnswer: (index: number, value: string) => void;

  // 개발일지 상세 조회 - img list
  images: string[];
  getImgList: () => void;
  updateImg: (value: string) => void;

  // 개발일지 목록 조회 - 정렬
  sortIdx: number;
  setSortIdx: (idx: number) => void;
}

const useDiaryStore = create<DiaryState>((set) => ({
  // 개발일지 작성, 수정 및 상세 조회 - qna list
  questionList: [
    {
      question: '',
      description: '',
    },
    {
      question: '',
      description: '',
    },
    {
      question: '',
      description: '',
    },
  ],
  title: '',
  answers: ['', '', ''],
  initQnaList: () =>
    set(() => ({
      title: '',
      questionList: [
        // TODO 질문 문항 더미 리스트
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
      answers: ['', '', ''],
    })),
  getQnaList: () =>
    set(() => ({
      // axios.get()
      title: '개발일지 리스트',
      questionList: [
        // TODO 질문 문항 더미 리스트
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
      answers: [
        '이번 작업은 주어진 데이터 셋을 분석하여 의미 있는 정보를 도출하는 것이었습니다. 데이터는 여러 형식으로 제공되어 있었고, 이를 처리하기 위해 Python의 pandas와 numpy 라이브러리를 사용하여 데이터를 정제하고, 분석 가능한 형태로 변환했습니다. 추가적으로, 시각화를 위해 matplotlib를 사용해 데이터를 그래프와 차트로 나타내어 패턴과 트렌드를 쉽게 파악할 수 있도록 했습니다. 최종 목표는 이러한 정보를 기반으로 의미 있는 인사이트를 도출하고, 이를 바탕으로 한 보고서를 작성하는 것이었습니다.',
        '작업 중 어려웠던 점은 데이터의 불완전성과 여러 형식으로 구성된 데이터 셋을 일관되게 정제하는 부분이었습니다. 특정 데이터가 누락되거나 잘못된 형식으로 제공되어 전처리 과정에서 예상보다 많은 시간이 소요되었습니다. 또한, 데이터 셋이 매우 커서 메모리 관리를 위한 최적화가 필요했으며, 일부 데이터 포인트가 일관되지 않게 기록되어 있어 이를 조정하기 위해 추가적인 코드 작성이 필요했습니다. 이러한 문제를 해결하는 과정에서 다양한 데이터 정제 및 변환 기법을 배우고 적용하게 되었습니다.',
        '문제는 결국 해결되었습니다. 데이터 정제 과정에서 발생한 문제들을 하나씩 해결해 나가면서 데이터를 안정적으로 정리할 수 있었습니다. 특히 누락된 데이터를 처리하기 위해 imputation 기법을 활용했고, 데이터의 형식을 변환하여 일관성을 유지했습니다. 또한, 최적화를 통해 메모리 사용량을 줄이고 처리 속도를 개선할 수 있었습니다. 이 과정을 통해 데이터 분석의 전체 흐름에 대한 이해도가 높아졌고, 다음 프로젝트에 더 효율적으로 접근할 수 있는 자신감을 얻었습니다.',
      ],
    })),
  updateAnswer: (index, value) =>
    set((state) => ({
      answers: state.answers.map((answer, i) => (i === index ? value : answer)),
    })),

  // 개발일지 상세 조회 - img list
  images: [],
  getImgList: () =>
    set(() => ({
      images: [],
    })),
  updateImg: (value: string) =>
    set((state) => ({
      images: [...state.images, value],
    })),

  // 개발일지 목록 조회 - 정렬
  sortIdx: 0,
  setSortIdx: (idx) => set(() => ({ sortIdx: idx })),
}));

export default useDiaryStore;
