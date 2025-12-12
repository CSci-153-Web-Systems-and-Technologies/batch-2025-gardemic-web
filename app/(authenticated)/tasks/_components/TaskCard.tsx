import React from 'react';
import { Task } from '@/types';
import { getTaskStatus, formatDate } from '@/lib/utils';
import { Droplets, Sprout } from 'lucide-react'; 

interface TaskCardProps {
  task: Task;
  plantName: string; 
  onComplete: (taskId: string) => void;
  isCompleted: boolean; 
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, plantName, onComplete, isCompleted }) => {
  const status = getTaskStatus(task, isCompleted);
  
  const Icon = task.task_type.toLowerCase().includes('water') ? Droplets : Sprout;
  
  const statusColors = {
    Ongoing: 'text-gray-600',
    Overdue: 'text-red-600 font-bold',
    Completed: 'text-green-600 font-bold'
  };

  return (
    <div className="flex flex-col justify-between border border-gray-300 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow h-64">
      
      {/* Header Section */}
      <div className="flex gap-4 items-start">
        <div className={`p-2 rounded-full ${task.task_type.toLowerCase().includes('water') ? 'bg-blue-100' : 'bg-green-100'}`}>
           <Icon className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">{task.task_type}</h3>
          <p className="text-gray-600">{plantName}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-2 mt-4">
        <div className="flex justify-between text-md">
          <span className="font-medium text-gray-800">Due: {formatDate(task.end_date)}</span>
        </div>
        <div className="text-md">
          Status: <span className={statusColors[status]}>{status}</span>
        </div>
      </div>


      <button
        onClick={() => onComplete(task.task_id)}
        disabled={status === 'Completed'}
        className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold transition-colors ${
          status === 'Completed' 
            ? 'bg-green-700 text-white cursor-default' 
            : 'bg-primary-green text-white hover:bg-[#233b23]'
        }`}
      >
        {status === 'Completed' ? 'Completed' : 'Mark as Complete'}
      </button>
    </div>
  );
};