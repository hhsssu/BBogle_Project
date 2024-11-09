import style from './ProjectDetail.module.css';

import Back from '../../../assets/image/icon/Back.svg';
import Bubble from '../../../assets/lottie/Bubble.json';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useProjectStore from '../../../store/useProjectStore';

import ProjectInfoSection from '../projectInfoSection/ProjectInfoSection';
import DiaryList from '../../diary/diaryList/DiaryList';
import Modal from '../../common/modal/Modal';
import Loading from '../../common/loading/Loading';

function ProjectDetail() {
  const PROJECT = useProjectStore((state) => state.project);

  const navigate = useNavigate();

  const [isFinModalOpen, setFinModalOpen] = useState(false);
  const [isFinLoadingOpen, setFinLoadingOpen] = useState(false);

  const [tabIdx, setTabIdx] = useState(0);
  const [sortIdx, setSortIdx] = useState(0);

  const navPjtList = () => {
    navigate('/project');
  };

  const navDiaryCreate = () => {
    navigate('diary/create');
  };

  const changeTab = (idx: number) => {
    setTabIdx(idx);
  };

  const changeSort = (idx: number) => {
    setSortIdx(idx);
  };

  const handleFinModal = () => {
    setFinModalOpen(!isFinModalOpen);
  };

  const finishProject = () => {
    setFinModalOpen(false);
    setFinLoadingOpen(true);

    setTimeout(() => {
      setFinLoadingOpen(false);
    }, 2000);
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.backBtn} onClick={navPjtList}>
          <img src={Back} alt="뒤로가기 버튼" />
          프로젝트 목록
        </div>

        <div className={style.pjtInfoSection}>
          <ProjectInfoSection />

          {PROJECT.status && (
            <button className={style.pjtEndBtn} onClick={handleFinModal}>
              프로젝트 종료
            </button>
          )}
        </div>

        <section className={style.tabSection}>
          {/* 탭 */}
          <div className={style.tabList}>
            <div
              className={`${style.tab} ${tabIdx === 0 && style.tabActive}`}
              onClick={() => changeTab(0)}
            >
              개발일지
              <div className={style.diaryCnt}>{32}</div>
            </div>
            {!PROJECT.status && (
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
        </section>

        <section className={style.diarySection}>
          {tabIdx === 0 ? <DiaryList /> : ''}
        </section>
      </div>

      <Modal
        isOpen={isFinModalOpen}
        title={'프로젝트를 종료하시겠어요?'}
        content={
          '종료 시 회고록이 생성되고 더 이상 개발일지를 작성할 수 없어요'
        }
        onClose={handleFinModal}
        onConfirm={finishProject}
        confirmText={'삭제'}
        cancleText={'취소'}
      />

      <Loading
        isLoading={isFinLoadingOpen}
        title="회고록 작성 중 ..."
        animationData={Bubble}
      />
    </div>
  );
}

export default ProjectDetail;
