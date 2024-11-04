import { Route, Routes } from 'react-router-dom';

import OnboardingPage from '../pages/OnboardingPage';
import OAuthCallbackPage from '../pages/OAuthCallbackPage';
import ProjectPage from '../pages/ProjectPage';
import ExperiencePage from '../pages/ExperiencePage';
import MainPage from '../pages/MainPage';
import Main from '../components/main/Main';
import DiaryPage from '../pages/DiaryPage';

function AppRouter() {
  return (
    <Routes>
      // 온보딩 페이지
      <Route path="/" element={<OnboardingPage />}></Route>
      <Route path="/oauth" element={<OAuthCallbackPage />}></Route>
      // 메인 페이지
      <Route path="/main" element={<MainPage />}>
        <Route index element={<Main />} />
      </Route>
      // 프로젝트 페이지
      <Route path="/project/*" element={<ProjectPage></ProjectPage>}>
        // 개발일지 페이지
        <Route path="diary/*" element={<DiaryPage></DiaryPage>} />
      </Route>
      <Route path="experience/*" element={<ExperiencePage />} />
    </Routes>
  );
}

export default AppRouter;
