import React from 'react';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import CalendarPage from './pages/CalendarPage';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return <Navigate to="/login" replace />;
}

export default App;