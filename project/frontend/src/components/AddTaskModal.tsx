import React, { useState } from 'react';
import { format } from 'date-fns';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { generateId, saveTask } from '../utils/localStorage';
import { Task, TaskPriority, TaskStatus } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onTaskAdded: (task: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  projectId,
  onTaskAdded
}) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium' as TaskPriority,
    status: 'backlog' as TaskStatus
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskData.title.trim()) {
      setError('Task title is required');
      return;
    }

    setIsLoading(true);
    setError('');

    // Create new task
    const newTask: Task = {
      id: generateId(),
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      projectId,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      status: taskData.status,
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    saveTask(newTask);
    
    // Notify parent component
    onTaskAdded(newTask);
    
    // Reset form and close modal
    setTaskData({
      title: '',
      description: '',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      priority: 'medium',
      status: 'backlog'
    });
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Task"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Create Task
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
          id="title"
          name="title"
          label="Task Title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          autoFocus
        />
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={taskData.description}
            onChange={handleChange}
            placeholder="Add task details"
            className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </div>
        
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          label="Due Date"
          value={taskData.dueDate}
          onChange={handleChange}
        />
        
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="px-3 py-2 bg-white border shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="px-3 py-2 bg-white border shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
          >
            <option value="backlog">Backlog</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;