import { Route, Routes } from 'react-router-dom';
import ExList from '../components/experience/ExList';
import ExDetail from '../components/experience/experienceDetail/ExDetail';
import ExCreate from '../components/experience/experienceCreateUpdate/ExCreate';

import ExStyles from '../components/experience/Experience.module.css';
import ExUpdate from '../components/experience/experienceCreateUpdate/ExUpdate';

function ExperiencePage() {
  return (
    <div className={ExStyles.container}>
      <Routes>
        <Route path="" element={<ExList />} />
        <Route path="create" element={<ExCreate />} />
        <Route path=":exId" element={<ExDetail />} />
        <Route path="update/:exId" element={<ExUpdate />} />
      </Routes>
    </div>
  );
}

export default ExperiencePage;
