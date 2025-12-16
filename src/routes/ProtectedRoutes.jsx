import { Navigate } from 'react-router-dom';
import { routes, getAuthData } from '../enums';
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getAuthData('token');
  const user = getAuthData('user');
  const isAuthenticated = !!token;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    // is to check if the user role is allowed to access the page
    return <Navigate to={routes.HOME} replace />;

  return children;
};
export default ProtectedRoute;
