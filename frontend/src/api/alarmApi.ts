import axiosInstance from './axiosInstance';

export const transferSubscribe = async (subscription: PushSubscription) => {
  try {
    await axiosInstance.post('/api/subscribe', {
      body: JSON.stringify(subscription),
    });
  } catch (error) {
    console.error('구독 정보 저장 요청 중 문제 발생 : ', error);
  }
};
