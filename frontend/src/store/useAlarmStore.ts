import { create } from 'zustand';

interface AlarmStore {
  fcmToken: string | null;
  setFcmToken: (token: string) => void;
}

// 알림 FCM Token 상태관리
const useAlarmStore = create<AlarmStore>()((set) => ({
  fcmToken: null,
  setFcmToken: (token: string) => {
    set(() => ({ fcmToken: token }));
  },
}));

export default useAlarmStore;
