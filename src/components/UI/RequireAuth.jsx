import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/Auth';

function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireAuth;
