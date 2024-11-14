import { transferSubscribe } from '../api/alarmApi';

const VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY;

// 알림 권한 요청 함수
export async function requestNotificationPermission() {
  // Notification API가 브라우저에서 지원하는지 확인
  if ('Notification' in window) {
    // 알림 권한이 default라면 권한 요청 (이미 권한이 있는지 확인)
    if (Notification.permission === 'default') {
      // 권한 요청 팝업을 표시하고, 응답 대기
      const permission = await Notification.requestPermission();

      // 사용자가 권한을 허용했는지 여부에 따라 결과 출력
      if (permission === 'granted') {
        // 푸시 구독 진행
        subscribeUser();
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    }
  }
}

// 알림 구독을 위해 호출
const subscribeUser = async () => {
  // 현재 페이지에서 Service Worker가 준비될 때까지 대기
  const registration = await navigator.serviceWorker.ready;
  // 푸시 알림을 위한 구독 객체 생성 (applicationServerKey는 VAPID 공개 키)
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: VAPID_KEY,
  });

  // 생성된 구독 객체를 서버에 전송해 저장
  transferSubscribe(subscription);
};
