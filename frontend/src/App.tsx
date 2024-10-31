import { useLocation } from "react-router-dom";
import style from "./App.module.css";
import SideBar from "./components/common/sideBar/SideBar";
import AppRouter from './routes/AppRouter'
import useSideBarStore from "./store/useSideBarStore";


function App() {
  const { isOpen } = useSideBarStore();
  const location = useLocation();

  // 현재 경로가 '/onboarding'이면 AppRouter를 렌더링하지 않음
  const isOnboarding = location.pathname === "/";

  return (
    <div className={style['app-container']}>
      {!isOnboarding && <SideBar />}
      <div className={`${style['app-content']} ${isOnboarding ? '' : isOpen ? style.open : style.closed}`}>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
