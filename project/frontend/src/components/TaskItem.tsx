import React, { useState } from 'react';
import { format, isAfter } from 'date-fns';
import { 
  Calendar, 
  Trash2,
  Edit
} from 'lucide-react';
import Button from './Button';
import { Task } from '../types';
import { saveTask, deleteTask } from '../utils/localStorage';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import EditTaskModal from './EditTaskModal';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onTaskUpdated,
  onTaskDeleted
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isOverdue = task.status !== 'done' && 
    isAfter(new Date(), new Date(task.dueDate));

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedTask = {
      ...task,
      status: e.target.value as Task['status']
    };
    
    saveTask(updatedTask);
    onTaskUpdated(updatedTask);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      onTaskDeleted(task.id);
    }
  };

  return (
    <div className={`
      bg-white border rounded-lg p-4 mb-3 transition-all hover:shadow-md
      ${isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'}
    `}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{task.title}</h3>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 items-center mb-3">
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
            
            <div className={`
              flex items-center text-xs
              ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}
            `}>
              <Calendar size={14} className="mr-1" />
              <span>
                {isOverdue ? 'Overdue: ' : 'Due: '}
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-3 sm:mt-0 ml-auto">
          <div className="mr-2">
            <select
              value={task.status}
              onChange={handleStatusChange}
              className="text-sm border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="backlog">Backlog</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            icon={<Edit size={14} />}
            className="mr-1"
          >
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            icon={<Trash2 size={14} />}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>
      
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onTaskUpdated={onTaskUpdated}
      />
    </div>
  );
};

export default TaskItem;