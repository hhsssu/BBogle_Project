import ExCard from './ExCard';
import ExStyles from './Experience.module.css';

function ExList() {
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
  ];
  return (
    <section className={ExStyles.list}>
      {exCardList.length > 0
        ? exCardList.map((exCard, index) => (
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
        : '목록이 없습니다.'}
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
  );
}

export default ExList;
