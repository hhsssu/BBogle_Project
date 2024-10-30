import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OnboardingPage from '../pages/OnboardingPage';
import ProjectPage from '../pages/ProjectPage';
import ProjectList from '../components/project/ProjectList';

function AppRouter() {
  return (
    <Router>
      <Routes>
        // 온보딩 페이지
        <Route path="/" element={<OnboardingPage></OnboardingPage>}></Route>
        // 프로젝트 페이지
        <Route path="/project" element={<ProjectPage></ProjectPage>}>
          <Route path="" element={<ProjectList></ProjectList>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
