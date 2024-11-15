import axiosInstance from './axiosInstance';

// 알림 구독을 위한 토큰 전송
export const transferToken = async (token: string) => {
  try {
    await axiosInstance.post('/api/subscribe', {
      body: JSON.stringify({ token }),
    });
    console.log('백엔드로 구독 정보 전송 성공');
  } catch (error) {
    console.error('구독 정보 저장 요청 중 문제 발생 : ', error);
  }
};
