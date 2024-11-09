import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // 로딩 중에는 아무것도 렌더링하지 않아 현재 페이지 유지
    return null;
  }

  // 로그인 상태라면 메인 페이지로 리디렉션
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
