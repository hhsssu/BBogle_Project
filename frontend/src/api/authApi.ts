import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_LINK = import.meta.env.VITE_API_URL;

// Refresh Token 요청 전용 인스턴스
const refreshInstance = axios.create({
  baseURL: API_LINK,
  withCredentials: true, // Refresh Token을 쿠키로 보내기 위해 설정
});

// AccessToken을 재발급하는 API
export const refreshAccessToken = async () => {
  try {
    const response = await refreshInstance.get('/auth/refresh');
    return response.data.accessToken;
  } catch (error) {
    console.error('Access Token 재발급 실패:', error);
    // Access Token 재발급 실패 시 로그인 페이지로 리디렉션
    window.location.href = '/login';
    return Promise.reject(error);
  }
};

// 유저 정보를 가져오는 API
export const fetchUserDetail = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    console.error('유저 정보를 가져오는 중 문제 발생 : ', error);
    throw error;
  }
};

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
