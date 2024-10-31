import { Route, Routes } from 'react-router-dom';
import ExList from '../components/experience/ExList';
import ExDetail from '../components/experience/ExDetail';
import ExCreate from '../components/experience/ExCreate';

import ExStyles from '../components/experience/Experience.module.css';

function ExperiencePage() {
  return (
    <div className={ExStyles.main}>
      <Routes>
        <Route path="" element={<ExList />} />
        <Route path="create" element={<ExCreate />} />
        <Route path="detail/:exId" element={<ExDetail />} />
      </Routes>
    </div>
  );
}

export default ExperiencePage;
