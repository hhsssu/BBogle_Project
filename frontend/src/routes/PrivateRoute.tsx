// components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = (): React.ReactElement | null => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // 로딩 중인 경우 현재 페이지 유지
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
