import axios from 'axios';
import { refreshAccessToken } from '../api/authApi';

const API_LINK = import.meta.env.VITE_API_URL;

// axios 인스턴스
const axiosInstance = axios.create({
  baseURL: API_LINK,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터로 인증 헤더 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    // TODO : URL 확인용
    console.log('API 요청 URL:', API_LINK + config.url);

    // localStorage에서 accessToken 가져오기
    let token = localStorage.getItem('accessToken');

    // localStorage에 accessToken이 없으면 refresh로 새 토큰 요청
    if (!token) {
      try {
        token = await refreshAccessToken();
        localStorage.setItem('accessToken', token!);
      } catch (error) {
        console.error('Access Token을 가져오는 데 실패했습니다:', error);
        return Promise.reject(error); // 새 토큰을 가져오는 데 실패 시 요청을 중단
      }
    }

    // 토큰이 있으면, 헤더에 accesstoken을 넣어 인증
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('요청 인터셉터 오류');
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('응답 인터셉터 방문');
    return response;
  },
  async (error) => {
    console.error('응답 인터셉터 오류 catch');
    if (!error.response) {
      console.error('네트워크 오류 또는 서버가 응답하지 않습니다.');
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Access Token 재발급 실패', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
