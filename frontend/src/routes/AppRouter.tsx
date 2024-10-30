import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OnboardingPage from "../pages/OnboardingPage";
import ExperiencePage from "../pages/ExperiencePage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        // 온보딩 페이지
        <Route path="/" element={<OnboardingPage></OnboardingPage>}></Route>
        <Route path="experience/*" element={<ExperiencePage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
