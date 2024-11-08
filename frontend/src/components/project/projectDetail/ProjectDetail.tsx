import Back from '../../../assets/image/icon/Back.svg';
import Setting from '../../../assets/image/icon/Setting.svg';
import Pencil from '../../../assets/image/icon/Pencil.svg';
import RedTrash from '../../../assets/image/icon/RedTrash.svg';

import style from './ProjectDetail.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DiaryList from '../../diary/diaryList/DiaryList';
import Modal from '../../common/modal/Modal';
import Bubble from '../../../assets/lottie/Bubble.json';
import useProjectStore from '../../../store/useProjectStore';
import Loading from '../../common/loading/Loading';

function ProjectDetail() {
  const PROJECT = useProjectStore((state) => state.project);
  const getProject = useProjectStore((state) => state.getProject);
  // {
  //   imageSrc: RunnerWay,
  //   title: 'Runner Way',
  //   state: true,
  //   term: '2024.10.03 ~ 2024.11.30',
  //   summary: '당신의 러닝을 함께하는 프로젝트',
  //   teammate: 6,
  //   roles: ['FE', 'BE', 'INFRA', 'AI'],
  //   techs: ['React', 'Spring', 'TypeScript', 'JPA', 'MongoDB'],
  //   diaryCnt: 32,
  // };

  const navigate = useNavigate();
  const { pjtId } = useParams();

  const settingIconRef = useRef<HTMLImageElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isFinModalOpen, setFinModalOpen] = useState(false);
  const [isFinLoadingOpen, setFinLoadingOpen] = useState(false);

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

  useEffect(() => {
    getProject(Number(pjtId));
  }, []);

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
          <img src={Back} alt="뒤로가기 버튼" />
          프로젝트 목록
        </div>

        <section className={style.info}>
          <div className={style.infoHeader}>
            <div className={style.pjtTitleContainer}>
              <img
                className={style.img}
                src={PROJECT.image}
                alt="프로젝트 이미지"
              />
              <span className={style.title}>{PROJECT.title}</span>
              <div ref={settingIconRef} className={style.settingBox}>
                <img
                  className={style.setting}
                  src={Setting}
                  alt="설정"
                  onClick={handleModalOpen}
                />
                <div
                  className={`${style.state} ${PROJECT.status ? style.stateActive : style.stateInActive}`}
                >
                  {PROJECT.status ? '진행 중' : '종료'}
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
            {PROJECT.status ? (
              <button className={style.endBtn} onClick={handleFinModal}>
                프로젝트 종료
              </button>
            ) : (
              ''
            )}
          </div>

          <div className={style.summary}>{PROJECT.description}</div>
          <div className={style.term}>
            {PROJECT.startDate} ~ {PROJECT.endDate} / {PROJECT.memberCount} 명
          </div>

          <div className={style.tagList}>
            <span className={style.subTitle}>나의 역할</span>
            {PROJECT.role.map((role, index) => (
              <div key={index} className={style.tag}>
                {role}
              </div>
            ))}
          </div>

          <div className={style.tagList}>
            <span className={style.subTitle}>사용 기술</span>
            {PROJECT.skill.map((skill, index) => (
              <div key={index} className={style.tag}>
                {skill}
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
              <div className={style.diaryCnt}>{32}</div>
            </div>
            {PROJECT.status ? (
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

          {tabIdx === 0 && (
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
        isOpen={isDeleteModalOpen}
        title={'정말 프로젝트를 삭제하시겠어요?'}
        content={'삭제 시 복구가 어려워요'}
        onClose={handleDeleteModal}
        onConfirm={deleteProject}
        confirmText={'확인'}
        cancleText={'취소'}
      />

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
