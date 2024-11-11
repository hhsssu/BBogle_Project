import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = (): React.ReactElement | null => {
  const { isAuthenticated } = useAuth();

  // 인증되지 않은 경우 로그인 페이지로 이동
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
