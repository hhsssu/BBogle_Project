import ProjectCard from '../../common/projectCard/ProjectCard';
import style from './ProjectList.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProjectStore from '../../../store/useProjectStore';

import EmptyFolder from '../../../assets/image/icon/EmptyFolder.svg';

function ProjectList() {
  const [onlyProgress, setOnlyProgress] = useState(false);

  const PJT_LIST = useProjectStore((state) => state.projectList);
  const getProjectList = useProjectStore((state) => state.getProjectList);

  const navigate = useNavigate();

  const navCreate = () => {
    navigate('/project/create');
  };

  const navPjtDetail = (pjtID: number) => {
    navigate(`${pjtID}`);
  };

  const handleProgress = () => {
    setOnlyProgress(!onlyProgress);
  };

  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <div className={style.container}>
      <section className={style.headerSection}>
        <div className={style.pageTitle}>프로젝트</div>
        <button className={style.pjtAddBtn} onClick={navCreate}>
          + 프로젝트 추가
        </button>
      </section>

      <section className={style.pjtSection}>
        <div
          className={`${style.checkProgress} ${onlyProgress ? style.active : ''}`}
          onClick={handleProgress}
        >
          {onlyProgress ? '전체보기' : '진행중인 것만 보기'}
        </div>
        {PJT_LIST.length !== 0 ? (
          <div className={style.projectGrid}>
            {onlyProgress
              ? PJT_LIST.filter((pjt) => pjt.status).map((card, index) => (
                  <div key={index} onClick={() => navPjtDetail(card.projectId)}>
                    <ProjectCard
                      pjtId={card.projectId}
                      imageSrc={card.image}
                      title={card.title}
                      state={card.status}
                      term={card.startDate + ' ~ ' + card.endDate}
                      summary={card.description}
                      notificationStatus={card.notificationStatus}
                    />
                  </div>
                ))
              : PJT_LIST.map((card, index) => (
                  <div key={index} onClick={() => navPjtDetail(card.projectId)}>
                    <ProjectCard
                      pjtId={card.projectId}
                      imageSrc={card.image}
                      title={card.title}
                      state={card.status}
                      term={card.startDate + ' ~ ' + card.endDate}
                      summary={card.description}
                      notificationStatus={card.notificationStatus}
                    />
                  </div>
                ))}
          </div>
        ) : (
          <div className={style.emptyPjtContainer}>
            <img
              className={style.emptyIcon}
              src={EmptyFolder}
              alt="프로젝트 없음"
            />
            <div className={style.emptyTextBox}>
              <p>프로젝트가 없어요.</p>
              <p className={style.boldText}>프로젝트를 생성해주세요!</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectList;
