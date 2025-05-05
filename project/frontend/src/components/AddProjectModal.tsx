import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { generateId, saveProject } from '../utils/localStorage';
import { Project } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onProjectAdded: (project: Project) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  userId,
  onProjectAdded
}) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    setIsLoading(true);
    setError('');

    // Create new project
    const newProject: Project = {
      id: generateId(),
      name: projectName.trim(),
      userId,
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    saveProject(newProject);
    
    // Notify parent component
    onProjectAdded(newProject);
    
    // Reset form and close modal
    setProjectName('');
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Project"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Create Project
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}
        
        <Input
          id="projectName"
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          autoFocus
        />
      </form>
    </Modal>
  );
};

export default AddProjectModal;