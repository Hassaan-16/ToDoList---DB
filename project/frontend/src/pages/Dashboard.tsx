import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';
import { useAuth } from '../contexts/AuthContext';
import { Project } from '../types';
import { getUserProjects } from '../utils/localStorage';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    // if (!isAuthenticated) {
    //   navigate('/login');
    //   return;
    // }

    if (user) {
      // Load projects
      const userProjects = getUserProjects(user.id);
      setProjects(userProjects);
      setIsLoading(false);
    }
  }, [isAuthenticated, user, navigate]);

  const handleProjectAdded = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const handleProjectDeleted = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {user && (
            <ProjectList
              projects={projects}
              userId={user.id}
              onProjectAdded={handleProjectAdded}
              onProjectDeleted={handleProjectDeleted}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;