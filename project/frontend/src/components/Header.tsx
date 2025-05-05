import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Check, ListChecks } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <ListChecks className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Taskify</span>
          </div>
          
          {user && (
            <div className="flex items-center">
              <div className="mr-4 text-sm text-gray-700">
                Hello, {user.firstName}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                icon={<LogOut size={16} />}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;