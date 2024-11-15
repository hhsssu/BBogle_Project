// firebase-messaging-sw.js
// Firebase 라이브러리를 서비스 워커에서 사용할 수 있도록 import
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging.js',
);

// Firebase 설정 객체 정의
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase Cloud Messaging 인스턴스 생성
const messaging = firebase.messaging();

// 백그라운드 메시지를 수신할 때의 핸들러 정의
messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드에서 메시지를 수신했습니다.', payload);

  // 수신된 메시지에서 제목과 본문을 추출하여 알림으로 표시
  if (payload.notification) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: 'icon', // 알림 아이콘을 지정
    };

    // 서비스 워커 컨텍스트에서 알림 표시
    self.registration.showNotification(notificationTitle, notificationOptions);
  } else {
    console.log('notification 필드가 포함되지 않은 메시지입니다.');
  }
});
