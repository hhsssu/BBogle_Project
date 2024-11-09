// TODO : 로그인 페이지에 적용
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = (): React.ReactElement | null => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // 로딩 중인 경우 현재 페이지 유지
    return null;
  }

  // 인증되지 않은 경우 로그인 페이지로 이동
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
