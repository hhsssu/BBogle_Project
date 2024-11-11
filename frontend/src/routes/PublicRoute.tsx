// TODO : 로그인 페이지에 적용
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // 로그인 상태라면 메인 페이지로 리디렉션
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
