
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage'; // Added SignupPage import
import ChatPage from '@/pages/ChatPage';
import LoadingSpinner from '@/components/LoadingSpinner';

// Simple Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show a loading indicator while checking auth status
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Route only accessible when not authenticated
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    return isAuthenticated ? <Navigate to="/chat" replace /> : children;
}

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} /> {/* Added Signup Route */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      {/* Redirect base path */}
       <Route path="/" element={<Navigate to="/login" replace />} />
       {/* Catch-all maybe later */}
       {/* <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} replace />} /> */}
    </Routes>
  );
};

export default App;
  