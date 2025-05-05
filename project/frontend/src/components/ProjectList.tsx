import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, FolderOpen } from 'lucide-react';
import Button from './Button';
import AddProjectModal from './AddProjectModal';
import { Project } from '../types';
import { deleteProject } from '../utils/localStorage';

interface ProjectListProps {
  projects: Project[];
  userId: string;
  onProjectAdded: (project: Project) => void;
  onProjectDeleted: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  userId,
  onProjectAdded,
  onProjectDeleted
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project? All tasks in this project will also be deleted.')) {
      deleteProject(projectId);
      onProjectDeleted(projectId);
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<Plus size={16} />}
        >
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new project.
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => setIsModalOpen(true)}
              icon={<Plus size={16} />}
            >
              New Project
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className="bg-white border border-gray-200 rounded-lg p-5 cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <button
                  onClick={(e) => handleDelete(project.id, e)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete project"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        onProjectAdded={onProjectAdded}
      />
    </div>
  );
};

export default ProjectList;