import style from './ProjectLogSection.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useProjectStore from '../../../../store/useProjectStore';

import DiaryList from '../../../diary/diaryList/DiaryList';
import Summary from '../../../summary/Summary';

function ProjectLogSection() {
  const navigate = useNavigate();

  const [tabIdx, setTabIdx] = useState(0);
  const [sortIdx, setSortIdx] = useState(0);

  const PROJECT = useProjectStore((state) => state.project);

  const changeTab = (idx: number) => {
    setTabIdx(idx);
  };

  const changeSort = (idx: number) => {
    setSortIdx(idx);
  };

  const navDiaryCreate = () => {
    navigate('diary/create');
  };

  return (
    <div>
      <div className={style.tabSection}>
        {/* 탭 */}
        <div className={style.tabList}>
          <div
            className={`${style.tab} ${tabIdx === 0 && style.tabActive}`}
            onClick={() => changeTab(0)}
          >
            개발일지
            <div className={style.diaryCnt}>{32}</div>
          </div>
          {PROJECT.status && (
            <div
              className={`${style.tab} ${tabIdx === 1 && style.tabActive}`}
              onClick={() => changeTab(1)}
            >
              회고록
            </div>
          )}
        </div>

        {tabIdx === 0 && (
          <div className={style.controlContainer}>
            <div className={style.sortOptions}>
              <span
                className={`${sortIdx === 0 ? style.sortActive : style.sortInActive}`}
                onClick={() => changeSort(0)}
              >
                최신순
              </span>
              <span
                className={`${sortIdx === 1 ? style.sortActive : style.sortInActive}`}
                onClick={() => changeSort(1)}
              >
                과거순
              </span>
            </div>
            {PROJECT.status && (
              <button className={style.addDiaryBtn} onClick={navDiaryCreate}>
                + 개발일지 추가
              </button>
            )}
          </div>
        )}
      </div>
      <div className={style.tabContentSection}>
        {tabIdx === 0 ? <DiaryList /> : <Summary />}
      </div>{' '}
    </div>
  );
}

export default ProjectLogSection;
