import { Navigate, Outlet } from 'react-router';
// import { useAuth } from '@/features/auth/hooks/useAuth';

const PrivateRoute = () => {
  // TODO: Replace this hardcoded value with your actual auth hook later
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    // Redirect them to login, but replace the history so they can't click "Back" into a protected route
    return <Navigate to="/login" replace />;
  }

  // <Outlet /> renders whatever child route is currently active (ChatPage or ProfilePage)
  return <Outlet />;
};

export default PrivateRoute;