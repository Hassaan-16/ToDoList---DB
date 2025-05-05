import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  ArrowDownAZ, 
  ArrowDown01,
  ListFilter
} from 'lucide-react';
import Header from '../components/Header';
import Button from '../components/Button';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import { useAuth } from '../contexts/AuthContext';
import { Task, Project } from '../types';
import { getProjectById, getProjectTasks } from '../utils/localStorage';

type SortOption = 'priority' | 'dueDate' | 'none';
type FilterStatus = 'all' | 'backlog' | 'in-progress' | 'done';

const TasksPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (projectId) {
      // Load project
      const projectData = getProjectById(projectId);
      if (!projectData) {
        navigate('/dashboard');
        return;
      }
      setProject(projectData);

      // Load tasks
      const projectTasks = getProjectTasks(projectId);
      setTasks(projectTasks);
      setFilteredTasks(projectTasks);
      setIsLoading(false);
    }
  }, [isAuthenticated, projectId, navigate]);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...tasks];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Apply sorting
    if (sortOption === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      result.sort((a, b) => 
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    } else if (sortOption === 'dueDate') {
      result.sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }
    
    setFilteredTasks(result);
  }, [tasks, sortOption, statusFilter]);

  const handleTaskAdded = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
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
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              icon={<ArrowLeft size={16} />}
              className="mr-4"
            >
              Back to Projects
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {project?.name}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <Button
              onClick={() => setIsModalOpen(true)}
              icon={<Plus size={16} />}
              className="mb-4 sm:mb-0"
            >
              Add Task
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
                  className="pl-8 pr-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="backlog">Backlog</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <ListFilter size={16} className="text-gray-500" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="pl-8 pr-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="none">Sort By</option>
                  <option value="priority">Priority</option>
                  <option value="dueDate">Due Date</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  {sortOption === 'priority' ? (
                    <ArrowDownAZ size={16} className="text-gray-500" />
                  ) : (
                    <ArrowDown01 size={16} className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {tasks.length === 0 
                  ? "Get started by creating a new task."
                  : "No tasks match your current filter."}
              </p>
              {tasks.length === 0 && (
                <div className="mt-6">
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    icon={<Plus size={16} />}
                  >
                    New Task
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {projectId && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectId={projectId}
          onTaskAdded={handleTaskAdded}
        />
      )}
    </div>
  );
};

export default TasksPage;