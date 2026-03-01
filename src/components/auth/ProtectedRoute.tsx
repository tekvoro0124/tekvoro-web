import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Debug mode - temporarily bypass authentication
  const DEBUG_MODE = false; // Set to false to enable proper authentication

  console.log('=== PROTECTED ROUTE DEBUG ===');
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - isLoading:', isLoading);
  console.log('ProtectedRoute - localStorage tekvoro_user:', localStorage.getItem('tekvoro_user'));
  console.log('ProtectedRoute - Current URL:', window.location.href);
  console.log('ProtectedRoute - DEBUG_MODE:', DEBUG_MODE);
  console.log('================================');

  if (DEBUG_MODE) {
    console.log('ProtectedRoute - DEBUG MODE: Rendering protected content');
    return children;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    console.log('ProtectedRoute - Loading authentication state...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Redirecting to login because not authenticated');
    return <Navigate to="/admin/login" replace />;
  }

  console.log('ProtectedRoute - Rendering protected content');
  return children;
};

export default ProtectedRoute;