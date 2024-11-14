import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Service Worker가 브라우저에서 지원되는지 확인
// if ('serviceWorker' in navigator) {
//   // 지원되는 경우 'service-worker.js'파일 등록
//   navigator.serviceWorker
//     .register('/service-worker.js')
//     .then(function (registration) {
//       // 등록 성공 시 등록된 Service Worker의 'scope'를 콘솔에 출력
//       console.log('서비스 워커 등록 성공 : ', registration);
//     })
//     .catch(function (error) {
//       // 등록 실패 시 에러 메시지를 콘솔에 출력
//       console.log('서비스 워커 등록 중 문제 발생 : ', error);
//     });
// }

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
