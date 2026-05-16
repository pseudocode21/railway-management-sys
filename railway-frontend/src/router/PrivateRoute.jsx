import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '../utils/jwt';

export default function PrivateRoute() {
  const token = localStorage.getItem('jwt');
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}