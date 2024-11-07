import RunnerWay from '../../../assets/image/RunnerWay.png';
import Setting from '../../../assets/image/icon/Setting.svg';
import Pencil from '../../../assets/image/icon/Pencil.svg';
import RedTrash from '../../../assets/image/icon/RedTrash.svg';

import style from './ProjectDetail.module.css';
import { useEffect, useRef, useState } from 'react';
import DiaryList from '../../diary/diaryList/DiaryList';
import { useNavigate } from 'react-router-dom';
import Modal from '../../common/modal/Modal';

function ProjectDetail() {
  const PROJECT = {
    imageSrc: RunnerWay,
    title: 'Runner Way',
    state: true,
    term: '2024.10.03 ~ 2024.11.30',
    summary: '당신의 러닝을 함께하는 프로젝트',
    teammate: 6,
    roles: ['FE', 'BE', 'INFRA', 'AI'],
    techs: ['React', 'Spring', 'TypeScript', 'JPA', 'MongoDB'],
    diaryCnt: 32,
  };

  const navigate = useNavigate();

  const settingIconRef = useRef<HTMLImageElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [tabIdx, setTabIdx] = useState(0);
  const [sortIdx, setSortIdx] = useState(0);

  const navPjtList = () => {
    navigate('/project');
  };

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };

  const navProjectUpdate = () => {
    setModalOpen(false);
    navigate(`update`);
  };

  const navDiaryCreate = () => {
    navigate('diary/create');
  };

  const handleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteProject = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const changeTab = (idx: number) => {
    setTabIdx(idx);
  };

  const changeSort = (idx: number) => {
    setSortIdx(idx);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingIconRef.current &&
        !settingIconRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.backBtn} onClick={navPjtList}>
          돌아가기
        </div>

        <section className={style.info}>
          <div className={style.infoHeader}>
            <div className={style.pjtTitleContainer}>
              <img className={style.img} src={PROJECT.imageSrc} alt="" />
              <span className={style.title}>{PROJECT.title}</span>
              <div ref={settingIconRef} className={style.settingBox}>
                <img
                  className={style.setting}
                  src={Setting}
                  alt="설정"
                  onClick={handleModalOpen}
                />
                <div
                  className={`${style.state} ${PROJECT.state ? style.stateActive : style.stateInActive}`}
                >
                  {PROJECT.state ? '진행 중' : '종료'}
                </div>
                {isModalOpen && (
                  <div className={style.modalBox}>
                    <div
                      className={style.modalContent}
                      onClick={navProjectUpdate}
                    >
                      <img className={style.modalImg} src={Pencil} alt="수정" />
                      <p>수정</p>
                    </div>
                    <div
                      className={style.modalContent}
                      onClick={handleDeleteModal}
                    >
                      <img
                        className={style.modalImg}
                        src={RedTrash}
                        alt="삭제"
                      />
                      삭제
                    </div>
                  </div>
                )}
              </div>
            </div>
            {PROJECT.state ? (
              <button className={style.endBtn}>프로젝트 종료</button>
            ) : (
              ''
            )}
          </div>

          <div className={style.summary}>{PROJECT.summary}</div>
          <div className={style.term}>
            {PROJECT.term} / {PROJECT.teammate} 명
          </div>

          <div className={style.tagList}>
            <span className={style.subTitle}>나의 역할</span>
            {PROJECT.roles.map((role, index) => (
              <div key={index} className={style.tag}>
                {role}
              </div>
            ))}
          </div>

          <div className={style.tagList}>
            <span className={style.subTitle}>사용 기술</span>
            {PROJECT.techs.map((tech, index) => (
              <div key={index} className={style.tag}>
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section className={style.tabSection}>
          {/* 탭 */}
          <div className={style.tabList}>
            <div
              className={`${style.tab} ${tabIdx === 0 ? style.activeTab : ''}`}
              onClick={() => changeTab(0)}
            >
              개발일지
              <div className={style.diaryCnt}>{PROJECT.diaryCnt}</div>
            </div>
            {PROJECT.state ? (
              ''
            ) : (
              <div
                className={`${style.tab} ${tabIdx === 1 ? style.activeTab : ''}`}
                onClick={() => changeTab(1)}
              >
                회고록
              </div>
            )}
          </div>

          {tabIdx === 0 ? (
            <div className={style.control}>
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
              {PROJECT.state && (
                <button className={style.addDiaryBtn} onClick={navDiaryCreate}>
                  + 개발일지 추가
                </button>
              )}
            </div>
          ) : (
            ''
          )}
        </section>

        <section className={style.diarySection}>
          {tabIdx === 0 ? <DiaryList /> : ''}
        </section>
      </div>

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          title={'정말 프로젝트를 삭제하시겠어요?'}
          content={'삭제 시 복구가 어려워요'}
          onClose={handleDeleteModal}
          onConfirm={deleteProject}
          confirmText={'확인'}
          cancleText={'취소'}
        />
      )}
    </div>
  );
}

export default ProjectDetail;
