import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';

// Import your pages
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ChatPage from '@/pages/ChatPage';
import ProfilePage from '@/pages/ProfilePage';

// Import your route protector
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  // --- Public Routes ---
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },

  // --- Protected Routes ---
  {
    path: '/',
    element: <PrivateRoute />, // Checks if user is logged in
    children: [
      {
        index: true, // The default route ("/") loads the Chat
        element: <ChatPage />,
      },
      {
        path: 'profile', // "/profile"
        element: <ProfilePage />,
      },
    ],
  },

  // --- Fallback Route ---
  {
    path: '*', // Catch any invalid URLs and send them home
    element: <Navigate to="/" replace />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};