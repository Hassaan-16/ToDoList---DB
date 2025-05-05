import React from 'react';
import { Clock, Loader, CheckCircle } from 'lucide-react';
import { TaskStatus } from '../types';

interface StatusBadgeProps {
  status: TaskStatus;
  showIcon?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status,
  showIcon = true,
  className = ''
}) => {
  const config = {
    'backlog': {
      icon: <Clock size={14} />,
      text: 'Backlog',
      classes: 'bg-gray-100 text-gray-800 border-gray-200'
    },
    'in-progress': {
      icon: <Loader size={14} />,
      text: 'In Progress',
      classes: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    'done': {
      icon: <CheckCircle size={14} />,
      text: 'Done',
      classes: 'bg-green-100 text-green-800 border-green-200'
    }
  };

  const { icon, text, classes } = config[status];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${classes} ${className}`}>
      {showIcon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  );
};

export default StatusBadge;