import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 서비스 워커 등록 및 FCM 토큰 요청
navigator.serviceWorker.register('/firebase-messaging-sw.js').catch((error) => {
  console.error('서비스 워커 등록 중 오류 발생:', error);
});

// React 앱 렌더링
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
