import { Route, Routes } from 'react-router-dom';

import OnboardingPage from '../pages/OnboardingPage';
import ProjectPage from '../pages/ProjectPage';
import ProjectList from '../components/project/projectList/ProjectList';
import ProjectDetail from '../components/project/projectDetail/ProjectDetail';
import ProjectCreate from '../components/project/projectCreate/ProjectCreate';
import ExperiencePage from '../pages/ExperiencePage';
import MainPage from '../pages/MainPage';
import Main from '../components/main/Main';

function AppRouter() {
  return (
    <Routes>
      // 온보딩 페이지
      <Route path="/" element={<OnboardingPage />}></Route>
      // 메인 페이지
      <Route path="/main" element={<MainPage />}>
        <Route index element={<Main />} />
      </Route>
      // 프로젝트 페이지
      <Route path="/project" element={<ProjectPage></ProjectPage>}>
        <Route path="" element={<ProjectList></ProjectList>}></Route>
        <Route path=":pjtId" element={<ProjectDetail></ProjectDetail>}></Route>
        <Route path="create" element={<ProjectCreate></ProjectCreate>}></Route>
      </Route>
      <Route path="experience/*" element={<ExperiencePage />} />
    </Routes>
  );
}

export default AppRouter;
