import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from './App.module.css';
import SideBar from './components/common/sideBar/SideBar';
import AppRouter from './routes/AppRouter';
import useSideBarStore from './store/useSideBarStore';
import { onMessageListener } from './config/firebase';

function App() {
  const { isOpen } = useSideBarStore();
  const location = useLocation();

  // 현재 경로가 '/login'이면 SideBar를 렌더링하지 않음
  const isOnboarding = location.pathname === '/login';

  // 알림 권한 및 FCM 토큰 상태 관리
  const [notification, setNotification] = useState<{
    title: string;
    body: string;
  } | null>(null);

  useEffect(() => {
    // 메시지 수신 리스너 설정
    onMessageListener()
      .then((payload) => {
        console.log('메시지를 수신했습니다: ', payload);
        setNotification({
          title: payload.notification?.title ?? '제목 없음', // 메시지 제목
          body: payload.notification?.body ?? '내용 없음', // 메시지 내용
        });
      })
      .catch((err) => console.log('메시지 수신 실패: ', err));
  }, []);

  return (
    <div className={style['app-container']}>
      {/* 현재 경로가 '/login'이 아닌 경우에만 SideBar를 표시 */}
      {!isOnboarding && <SideBar />}
      <div
        className={`${style['app-content']} ${isOnboarding ? '' : isOpen ? style.open : style.closed}`}
      >
        <AppRouter />
        {/* 알림 메시지 표시 */}
        {notification && (
          <div className={style['notification']}>
            <h2>{notification.title}</h2>
            <p>{notification.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
