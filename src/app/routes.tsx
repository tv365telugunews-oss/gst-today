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
import AdminLoginScreen from './pages/admin/AdminLoginScreen';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageArticles from './pages/admin/ManageArticles';
import ManageVideos from './pages/admin/ManageVideos';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAds from './pages/admin/ManageAds';
import ManageShortNews from './pages/admin/ManageShortNews';
import Analytics from './pages/admin/Analytics';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import AccountDeletion from './pages/legal/AccountDeletion';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomeScreen />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/terms',
    element: <TermsScreen />,
  },
  {
    path: '/setup',
    element: <SetupScreen />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: '/account-deletion',
    element: <AccountDeletion />,
  },
  {
    path: '/app',
    element: <Layout />,
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
    ],
  },
  {
    path: '/admin',
    children: [
      { path: 'login', element: <AdminLoginScreen /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'ads', element: <ManageAds /> },
      { path: 'short-news', element: <ManageShortNews /> },
      { path: 'articles', element: <ManageArticles /> },
      { path: 'videos', element: <ManageVideos /> },
      { path: 'users', element: <ManageUsers /> },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
]);