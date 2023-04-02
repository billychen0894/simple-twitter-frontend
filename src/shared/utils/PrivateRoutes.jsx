import { Outlet, Navigate, useLocation } from 'react-router-dom';

function PrivateRoutes({ allowedRoles }) {
  const location = useLocation();
  const authToken = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if (authToken && allowedRoles === role) {
    return <Outlet />;
  }

  if (authToken && allowedRoles !== role) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default PrivateRoutes;
