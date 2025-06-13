import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuthStore } from './stores/authStore';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/Common/LoadingSpinner';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CoursePage = lazy(() => import('./pages/CoursePage'));
const ChapterPage = lazy(() => import('./pages/ChapterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const CreateCoursePage = lazy(() => import('./pages/CreateCoursePage'));
const CertificatePage = lazy(() => import('./pages/CertificatePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="create-course" element={<CreateCoursePage />} />
            <Route path="profile/:username" element={<ProfilePage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:userId" element={<MessagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Course routes (can be accessed without login but with limited features) */}
          <Route path="course/:courseId" element={<CoursePage />} />
          <Route path="course/:courseId/chapter/:chapterId" element={<ChapterPage />} />
          <Route path="certificate/:certificateId" element={<CertificatePage />} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;