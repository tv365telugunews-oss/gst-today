import { createBrowserRouter } from 'react-router';
import Layout from './components/gst/Layout';
import WelcomeScreen from './pages/gst/WelcomeScreen';
import LoginScreen from './pages/gst/LoginScreen';
import TermsScreen from './pages/gst/TermsScreen';
import SetupScreen from './pages/gst/SetupScreen';
import HomePage from './pages/gst/HomePage';
import ShortNewsScreen from './pages/gst/ShortNewsScreen';
import GSTTVScreen from './pages/gst/GSTTVScreen';
import VideoPlayerScreen from './pages/gst/VideoPlayerScreen';
import MagazineScreen from './pages/gst/MagazineScreen';
import NewsScreen from './pages/gst/NewsScreen';
import ArticleDetailScreen from './pages/gst/ArticleDetailScreen';
import DueDatesScreen from './pages/gst/DueDatesScreen';
import GSTToolsScreen from './pages/gst/GSTToolsScreen';
import ProfileScreen from './pages/gst/ProfileScreen';
import NotificationsScreen from './pages/gst/NotificationsScreen';
import AdminLoginScreen from './pages/admin/AdminLoginScreen';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import AccountDeletion from './pages/legal/AccountDeletion';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomeScreen />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
    errorElement: <NotFound />,
  },
  {
    path: '/terms',
    element: <TermsScreen />,
    errorElement: <NotFound />,
  },
  {
    path: '/setup',
    element: <SetupScreen />,
    errorElement: <NotFound />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    errorElement: <NotFound />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
    errorElement: <NotFound />,
  },
  {
    path: '/account-deletion',
    element: <AccountDeletion />,
    errorElement: <NotFound />,
  },
  {
    path: '/app',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'short', element: <ShortNewsScreen /> },
      { path: 'gst-tv', element: <GSTTVScreen /> },
      { path: 'gst-tv/:videoId', element: <VideoPlayerScreen /> },
      { path: 'magazine', element: <MagazineScreen /> },
      { path: 'news', element: <NewsScreen /> },
      { path: 'news/:articleId', element: <ArticleDetailScreen /> },
      { path: 'due-dates', element: <DueDatesScreen /> },
      { path: 'tools', element: <GSTToolsScreen /> },
      { path: 'profile', element: <ProfileScreen /> },
      { path: 'notifications', element: <NotificationsScreen /> },
    ],
  },
  {
    path: '/admin',
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AdminLoginScreen /> },
      { path: 'login', element: <AdminLoginScreen /> },
      { path: 'dashboard', element: <AdminDashboard /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
