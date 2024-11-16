import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EmptySummary from '../../assets/image/icon/EmptySummary.svg';

import styles from './Summary.module.css';
import SummaryDetail from './SummaryDetail';
import SummaryUpdate from './SummaryUpdate';
import SummaryCreate from './SummaryCreate';
import { createSummaryAi } from '../../api/summaryApi';
import useSummaryStore from '../../store/useSummaryStore';
import useProjectStore from '../../store/useProjectStore';
import Loading from '../common/loading/Loading';
import Bubble from '../../assets/lottie/Bubble.json';

function Summary() {
  const fetchSummaryInfo = useSummaryStore((state) => state.fetchSummaryInfo);
  const summary = useSummaryStore((state) => state.summary);
  const projectId = useProjectStore((state) => state.project.projectId);
  const isSummaryLoading = useSummaryStore((state) => state.isSummaryLoading);

  useEffect(() => {
    fetchSummaryInfo(projectId);
    console.log('summary', summary.summaryId);
    if (summary.content !== '' && summary.summaryId !== undefined) {
      setOpenSection(true);
    }
  }, [projectId]);

  const [openSection, setOpenSection] = useState(false);
  const [detailSection, setDetailSection] = useState(true);
  const [createSection, setCreateSection] = useState(false);

  const { pjtId } = useParams();

  // 수정 컴포넌트 보이기
  const handleEdit = () => {
    setDetailSection(false);
  };

  // 수동 작성 컴포넌트 보이기
  const handleCreate = () => {
    setCreateSection(true);
  };

  // 작성 취소
  const handleCancleEdit = () => {
    setDetailSection(true);
    setCreateSection(false);
  };

  //TODO 회고 AI 생성 API 연결
  const handleCreateAi = () => {
    try {
      createSummaryAi(Number(pjtId));
    } catch (error) {
      console.log('회고록 생성 실패');
      console.log(error);
    }
  };

  if (isSummaryLoading) {
    return (
      <Loading
        isLoading={isSummaryLoading}
        title="데이터 로딩 중 ..."
        animationData={Bubble}
      />
    );
  }

  return (
    <>
      {/* 회고가 있으면 */}
      {openSection ? (
        // 회고 버튼 수정 클릭 유무
        detailSection ? (
          <SummaryDetail onEditClick={handleEdit} content={summary.content} />
        ) : (
          <SummaryUpdate
            onCancleClick={handleCancleEdit}
            onUpdateSuccess={() => {
              setDetailSection(true), setCreateSection(false);
            }}
            projectId={projectId}
            summary={summary}
          />
        )
      ) : !createSection ? (
        <section>
          <div className={styles.center}>
            <img src={EmptySummary} alt="회고 없음" />
            <p className={styles.description}>
              생성된 회고록이 없어요
              <br />
              <strong className={styles.bold}>회고록을 생성해 볼까요?</strong>
            </p>
          </div>
          <div className={styles.center}>
            <button className={styles.orangebtn} onClick={handleCreateAi}>
              AI 생성하기
            </button>
            <button className={styles.blackbtn} onClick={handleCreate}>
              직접 작성하기
            </button>
          </div>
        </section>
      ) : (
        <SummaryCreate
          onCancleClick={handleCancleEdit}
          onUpdateSuccess={() => {
            setDetailSection(true), setCreateSection(false);
          }}
          projectId={projectId}
          summary={summary}
        />
      )}
    </>
  );
}

export default Summary;
