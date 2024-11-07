import style from './ActivitySearch.module.css';
import GoBack from '../../../assets/image/icon/GoBack.svg';
import Search from '../../../assets/image/icon/Search.svg';
import useActivityKeywordStore from '../../../store/useActivityKeywordStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ActivitySearch() {
  const navigate = useNavigate();
  const { activityKeywords } = useActivityKeywordStore();
  const [selectProjects, setSelectProjects] = useState<number[]>([]);
  const [selectKeywords, setSelectKeywords] = useState<number[]>([]);

  useEffect(() => {
    console.log('keyword : ', selectKeywords);
    console.log('project: ', selectProjects);
  }, [selectKeywords, selectProjects]);

  // TODO: 임시 데이터
  const projectList = [
    {
      projectId: 1,
      image: 'https://example.com/image1.jpg',
      title: 'Project Alpha',
      description:
        'A project focused on improving user experience in mobile applications.',
      status: true,
      startDate: '2024-10-01',
      endDate: '2024-11-01',
      notificationStatus: true,
    },
    {
      projectId: 2,
      image: 'https://example.com/image2.jpg',
      title: 'Project Beta',
      description:
        'A project aimed at optimizing backend performance for high traffic.',
      status: false,
      startDate: '2024-09-15',
      endDate: '2024-10-15',
      notificationStatus: false,
    },
    {
      projectId: 3,
      image: 'https://example.com/image3.jpg',
      title: 'Project Gamma',
      description:
        'A frontend refactoring project to enhance code quality and maintainability.',
      status: true,
      startDate: '2024-08-10',
      endDate: '2024-09-10',
      notificationStatus: true,
    },
    {
      projectId: 4,
      image: 'https://example.com/image4.jpg',
      title: 'Project Delta',
      description:
        'A security-focused project ensuring data protection in web applications.',
      status: true,
      startDate: '2024-07-01',
      endDate: '2024-08-01',
      notificationStatus: false,
    },
  ];

  // 키워드 선택 및 해제 함수
  const handleKeywords = (id: number) => async () => {
    setSelectKeywords(
      (prev) =>
        prev.includes(id)
          ? prev.filter((prevId) => prevId !== id) // 이미 선택된 키워드인 경우 키워드 제외
          : [...prev, id], // 선택 안된 경우 추가
    );
  };

  // 프로젝트 선택 및 해제 함수
  const handleProject = (id: number) => () => {
    setSelectProjects((prev) =>
      prev.includes(id)
        ? prev.filter((prevId) => prevId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className={style.container}>
      <div className={style.searchContainer}>
        <img
          src={GoBack}
          alt=""
          onClick={() => {
            navigate('/activity');
          }}
        />
        <div>
          <img src={Search} alt="" />
          <input
            className={style.searchBar}
            type="text"
            placeholder="검색어를 입력하세요 (제목)"
          />
        </div>
        <button className={style.searchButton}>검색</button>
      </div>
      <div className={style.filterContainer}>
        <div className={style.filter}>
          <div className={style.title}>프로젝트명</div>
          <div className={style.tags}>
            {projectList.map((project, idx) => (
              <div
                key={idx}
                className={`${style.tag} ${style.project} ${selectProjects.includes(project.projectId) ? style.active : ''}`}
                onClick={handleProject(project.projectId)}
              >
                {project.title}
              </div>
            ))}
          </div>
        </div>
        <div className={style.filter}>
          <div className={style.title}>기술 키워드</div>
          <div className={style.tags}>
            {activityKeywords
              .filter((keyword) => !keyword.type)
              .map((keyword, idx) => (
                <div
                  key={idx}
                  className={`${style.tag} ${style.skill} ${selectKeywords.includes(keyword.id) ? style.active : ''}`}
                  onClick={handleKeywords(keyword.id)}
                >
                  {keyword.name}
                </div>
              ))}
          </div>
        </div>
        <div className={style.filter}>
          <div className={style.title}>인성 키워드</div>
          <div className={style.tags}>
            {activityKeywords
              .filter((keyword) => keyword.type)
              .map((keyword, idx) => (
                <div
                  key={idx}
                  className={`${style.tag} ${style.kind} ${selectKeywords.includes(keyword.id) ? style.active : ''}`}
                  onClick={handleKeywords(keyword.id)}
                >
                  {keyword.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitySearch;
