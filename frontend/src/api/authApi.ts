import axiosInstance from './axiosInstance';

// 유저 닉네임을 가져오는 API
export const fetchUserNickname = async () => {
  try {
    const response = await axiosInstance.get('/users/nickname');

    return response.data.nickname;
  } catch (error) {
    console.error('유저 닉네임을 가져오는 중 문제 발생 : ', error);
    throw error;
  }
};

// 로그아웃 API
export const logoutUser = async () => {
  try {
    await axiosInstance.post('/users/logout');
  } catch (error) {
    console.error('로그아웃 중 문제 발생 : ', error);
    throw error;
  }
};
