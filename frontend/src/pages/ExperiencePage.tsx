import { Route, Routes } from 'react-router-dom';
import ExList from '../components/experience/ExList';
import ExDetail from '../components/experience/experienceDetail/ExDetail';
import ExCreate from '../components/experience/experienceCreate/ExCreate';

import ExStyles from '../components/experience/Experience.module.css';

function ExperiencePage() {
  return (
    <div className={ExStyles.container}>
      <Routes>
        <Route path="" element={<ExList />} />
        <Route path="create" element={<ExCreate />} />
        <Route path=":exId" element={<ExDetail />} />
      </Routes>
    </div>
  );
}

export default ExperiencePage;
