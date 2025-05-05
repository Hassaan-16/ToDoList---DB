import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { TaskPriority } from '../types';

interface PriorityBadgeProps {
  priority: TaskPriority;
  showIcon?: boolean;
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ 
  priority,
  showIcon = true,
  className = ''
}) => {
  const config = {
    high: {
      icon: <AlertCircle size={14} />,
      text: 'High',
      classes: 'bg-red-100 text-red-800 border-red-200'
    },
    medium: {
      icon: <AlertTriangle size={14} />,
      text: 'Medium',
      classes: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    low: {
      icon: <Info size={14} />,
      text: 'Low',
      classes: 'bg-blue-100 text-blue-800 border-blue-200'
    }
  };

  const { icon, text, classes } = config[priority];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${classes} ${className}`}>
      {showIcon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  );
};

export default PriorityBadge;