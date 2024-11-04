import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useExperienceStore from '../../store/useExperienceStore';

import ExCard from './ExCard';
import ExStyles from './Experience.module.css';

import SearchIcon from '../../assets/image/icon/Search.svg';
import EmptyFolder from '../../assets/image/icon/EmptyFolder.svg';

function ExList() {
  const nav = useNavigate();
  const { experiences, fetchExperiences } = useExperienceStore();

  const navExCreate = () => {
    nav('create');
  };

  // 경험
  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

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
        <img src={SearchIcon} alt="검색" />
        <span>키워드, 내용으로 검색</span>
      </button>

      <section className={ExStyles.list}>
        {experiences.length > 0 ? (
          experiences.map((exCard, index) => (
            <div key={index}>
              <ExCard
                exID={exCard.exID}
                title={exCard.title}
                startDate={new Date(exCard.startDate)}
                endDate={new Date(exCard.endDate)}
                projectName={exCard.project.title}
                keywords={exCard.keywords}
              />
            </div>
          ))
        ) : (
          <>
            <div></div>
            <div className={ExStyles.nothing}>
              <img src={EmptyFolder} alt="비어있는 경험" />
              <p>만들어진 경험이 없어요.</p>
              <p className={ExStyles.semibold}>경험을 추가해 주세요!</p>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default ExList;
