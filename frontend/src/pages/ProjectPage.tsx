import { Routes, Route } from 'react-router-dom';

import ProjectList from '../components/project/projectList/ProjectList';
import ProjectDetail from '../components/project/projectDetail/ProjectDetail';
import ProjectCreate from '../components/project/projectCreate/ProjectCreate';

function ProjectPage() {
  return (
    <div>
      <Routes>
        <Route path="" element={<ProjectList></ProjectList>}></Route>
        <Route path=":pjtId" element={<ProjectDetail></ProjectDetail>}></Route>
        <Route path="create" element={<ProjectCreate></ProjectCreate>}></Route>
      </Routes>
    </div>
  );
}

export default ProjectPage;
