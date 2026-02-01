import { Navigate } from 'react-router-dom';
import { routes } from '../enums';

import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to={routes.LOGIN} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to={routes.HOME} replace />;

  return children;
};
export default ProtectedRoute;
