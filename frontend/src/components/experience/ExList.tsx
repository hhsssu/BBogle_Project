import ExCard from './ExCard';
import ExStyles from './Experience.module.css';

import searchIcon from '../../assets/image/icon/search.svg';
import emptyFolder from '../../assets/image/icon/emptyFolder.svg';
import { useNavigate } from 'react-router-dom';

function ExList() {
  const nav = useNavigate();
  const navExCreate = () => {
    nav('create');
  };

  // 더미 데이터 예시
  const exCardList = [
    {
      exId: 1,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 2,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 3,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 4,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 4,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 4,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 5,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 6,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 7,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 8,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 9,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 10,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
    {
      exId: 11,
      title: '소셜 로그인 구현',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      tags: [
        { type: 0, name: '기술태그' },
        { type: 0, name: '기술태그' },
        { type: 1, name: '인성태그' },
      ],
    },
  ];
  return (
    <>
      <section className={ExStyles.between}>
        <div className={ExStyles.title}>나의 경험</div>
        <button className={ExStyles.btn} onClick={navExCreate}>
          + 경험 추가
        </button>
      </section>

      {/* 검색 버튼 - 클릭 시 검색 모달 OPEN */}
      <button className={ExStyles.search}>
        <img src={searchIcon} alt="검색" />
        <span>키워드, 내용으로 검색</span>
      </button>

      <section className={ExStyles.list}>
        {exCardList.length > 0 ? (
          exCardList.map((exCard, index) => (
            <div key={index}>
              <ExCard
                exId={exCard.exId}
                title={exCard.title}
                startDate={new Date(exCard.startDate)}
                endDate={new Date(exCard.endDate)}
                tags={exCard.tags}
              />
            </div>
          ))
        ) : (
          <div className={ExStyles.nothing}>
            <img src={emptyFolder} alt="비어있는 경험" />
            <p>만들어진 경험이 없어요.</p>
            <p className={ExStyles.bold}>경험을 추가해 주세요!</p>
          </div>
        )}
        {/* <ExCard
        title="소셜 로그인 구현"
        startDate={new Date('2024-01-01')}
        endDate={new Date('2024-02-01')}
        tags={[
          { type: 0, name: '기술태그' },
          { type: 0, name: '기술태그' },
          { type: 1, name: '인성태그' },
          ]}
          /> */}
      </section>
    </>
  );
}

export default ExList;
