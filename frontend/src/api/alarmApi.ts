import axiosInstance from './axiosInstance';

// 알림 구독을 위한 토큰 전송
export const transferToken = async (token: string) => {
  try {
    const response = await axiosInstance.post('/fcm', {
      fcmToken: token,
    });
    console.log('백엔드로 구독 정보 전송 성공 : ', response);
  } catch (error) {
    console.error('구독 정보 저장 요청 중 문제 발생 : ', error);
  }
};
