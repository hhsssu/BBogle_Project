import { Route, Routes, useNavigate } from 'react-router-dom';
import ExList from '../components/experience/ExList';
import ExDetail from '../components/experience/ExDetail';
import ExCreate from '../components/experience/ExCreate';
import searchIcon from '../assets/image/icon/search.svg';

import ExStyles from '../components/experience/Experience.module.css';

function ExperiencePage() {
  const nav = useNavigate();
  const navExList = () => {
    nav('list');
  };
  const navExCreate = () => {
    nav('create');
  };
  const navExDetail = () => {
    nav('detail');
  };

  return (
    <div className={ExStyles.main}>
      <div className={ExStyles.title}>나의 경험</div>

      {/* 검색 버튼 - 클릭 시 검색 모달 OPEN */}
      <button className={ExStyles.search}>
        <img src={searchIcon} alt="검색" />
        <span>키워드, 내용으로 검색</span>
      </button>

      <Routes>
        <Route path="list" element={<ExList />} />
        <Route path="create" element={<ExCreate />} />
        <Route path="detail" element={<ExDetail />} />
        {/* <Route path="detail/:exId" element={<ExDetail />} /> */}
      </Routes>
      <div>
        <button onClick={navExList}>목록</button>
        <button onClick={navExCreate}>생성</button>
        <button onClick={navExDetail}>상세</button>
      </div>
    </div>
  );
}

export default ExperiencePage;
