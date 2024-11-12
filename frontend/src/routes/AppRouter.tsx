import { Route, Routes } from 'react-router-dom';

import OnboardingPage from '../pages/OnboardingPage';
import ProjectPage from '../pages/ProjectPage';
import ActivityPage from '../pages/ActivityPage';
import MainPage from '../pages/MainPage';
import Main from '../components/main/Main';
import MyPage from '../pages/MyPage';
import { PrivateRoute } from './PrivateRoute';

function AppRouter() {
  return (
    <Routes>
      // 로그인 페이지
      <Route path="/login" element={<OnboardingPage />}></Route>
      // 메인 페이지
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Main />} />
        </Route>
        {/* 프로젝트 페이지 */}
        <Route path="project/*" element={<ProjectPage></ProjectPage>} />
        <Route path="activity/*" element={<ActivityPage />} />
        {/* 마이 페이지 */}
        <Route path="my" element={<MyPage />}></Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
