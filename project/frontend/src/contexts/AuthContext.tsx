import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import { 
  getCurrentUser, 
  getUserByEmail, 
  removeAuth, 
  saveAuth, 
  saveUser, 
  generateId 
} from '../utils/localStorage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would call an API
    // For this demo, we're using localStorage
    return new Promise((resolve, reject) => {
      const user = getUserByEmail(email);
      
      // Simulate API delay
      setTimeout(() => {
        if (user) {
          // In a real app, we would verify the password
          // For demo purposes, we'll just check if it exists
          saveAuth(user.id);
          setUser(user);
          setIsAuthenticated(true);
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<void> => {
    // In a real app, this would call an API
    return new Promise((resolve, reject) => {
      const existingUser = getUserByEmail(userData.email);
      
      setTimeout(() => {
        if (existingUser) {
          reject(new Error('Email already exists'));
        } else {
          // Create a new user
          const { password, ...userDataWithoutPassword } = userData;
          const newUser = { 
            ...userDataWithoutPassword, 
            id: generateId() 
          };
          
          saveUser(newUser);
          saveAuth(newUser.id);
          setUser(newUser);
          setIsAuthenticated(true);
          resolve();
        }
      }, 500);
    });
  };

  const logout = (): void => {
    removeAuth();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};