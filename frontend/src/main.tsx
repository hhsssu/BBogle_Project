import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 서비스 워커 등록 및 FCM 토큰 요청
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('서비스 워커 등록 완료 : ', registration.scope);
    })
    .catch((error) => {
      console.log('서비스 워커 등록 중 문제 발생: ', error);
    });
}

// React 앱 렌더링
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
