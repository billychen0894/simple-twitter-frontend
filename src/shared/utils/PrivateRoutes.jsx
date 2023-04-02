import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function PrivateRoutes({ allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoutes;
