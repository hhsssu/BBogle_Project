import { useNavigate } from 'react-router-dom';
import DiaryCard from '../diaryCard/DiaryCard';
import style from './DiaryList.module.css';

function DiaryList() {
  // TODO 다이어리 더미 데이터
  const diaryData = [
    { diaryID: 1, title: '오늘의 회고록', date: '2023.10.01' },
    { diaryID: 2, title: '프로그래밍 연습', date: '2023.10.02' },
    { diaryID: 3, title: '팀 프로젝트 진행', date: '2023.10.03' },
    { diaryID: 4, title: '알고리즘 문제 풀이', date: '2023.10.04' },
    { diaryID: 5, title: 'UI/UX 디자인 회의', date: '2023.10.05' },
    { diaryID: 6, title: '코드 리뷰', date: '2023.10.06' },
    { diaryID: 7, title: '배포 준비', date: '2023.10.07' },
    { diaryID: 8, title: '일일 회고', date: '2023.10.08' },
    { diaryID: 9, title: '모듈 리팩토링', date: '2023.10.09' },
    { diaryID: 10, title: '새로운 기능 추가', date: '2023.10.10' },
    { diaryID: 11, title: '프로젝트 계획 수립', date: '2023.10.11' },
    { diaryID: 12, title: '회고 작성', date: '2023.10.12' },
    { diaryID: 13, title: '테스트 코드 작성', date: '2023.10.13' },
    { diaryID: 14, title: '기능 배포', date: '2023.10.14' },
    { diaryID: 15, title: '팀 회의', date: '2023.10.15' },
    { diaryID: 16, title: '데이터베이스 설계', date: '2023.10.16' },
    { diaryID: 17, title: 'API 최적화', date: '2023.10.17' },
    { diaryID: 18, title: '서버 설정 변경', date: '2023.10.18' },
    { diaryID: 19, title: 'UI 컴포넌트 개선', date: '2023.10.19' },
    { diaryID: 20, title: '상태 관리 리팩토링', date: '2023.10.20' },
    { diaryID: 21, title: '회고', date: '2023.10.21' },
    { diaryID: 22, title: '디자인 수정', date: '2023.10.22' },
    { diaryID: 23, title: '로그인 기능 구현', date: '2023.10.23' },
    { diaryID: 24, title: '프로젝트 진행 상황 점검', date: '2023.10.24' },
    { diaryID: 25, title: '팀원 코드 리뷰', date: '2023.10.25' },
    { diaryID: 26, title: '성능 개선 작업', date: '2023.10.26' },
    { diaryID: 27, title: '개발 환경 설정', date: '2023.10.27' },
    { diaryID: 28, title: '새로운 스킬 학습', date: '2023.10.28' },
    { diaryID: 29, title: '프로젝트 테스트', date: '2023.10.29' },
    { diaryID: 30, title: '일일 회고', date: '2023.10.30' },
  ];

  const navigate = useNavigate();

  const navDiaryDetail = (diaryID: number) => {
    navigate(`${diaryID}`);
  };
  return (
    <div className={style.fins}>
      {diaryData.map((card) => (
        <div onClick={() => navDiaryDetail(card.diaryID)}>
          <DiaryCard key={card.diaryID} title={card.title} date={card.date} />
        </div>
      ))}
    </div>
  );
}

export default DiaryList;
