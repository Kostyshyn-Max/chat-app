import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();
  console.log(user);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;