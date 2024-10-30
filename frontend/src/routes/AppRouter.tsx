import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import OnboardingPage from '../pages/OnboardingPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        // 온보딩 페이지
        <Route path='/' element={<OnboardingPage></OnboardingPage>}></Route>
      </Routes>
    </Router>
  )
}

export default AppRouter;