import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';

function PrivateRoutes() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

  const redirectPath = pathname === '/login' ? '/login' : 'admin_login';

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
}

export default PrivateRoutes;
