import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Just redirect to the appropriate starting route
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />;
}

export default App;