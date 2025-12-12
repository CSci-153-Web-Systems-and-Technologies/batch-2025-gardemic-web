import { Droplet, Sprout, Scissors, Stethoscope, ClipboardList } from 'lucide-react';
import { TaskType } from '@/lib/utils';

const TASK_TYPE_ICONS: Record<TaskType, React.ReactNode> = {
  'Watering': <Droplet className="w-5 h-5 text-blue-500" />,
  'Fertilizing': <Sprout className="w-5 h-5 text-pink-500" />,
  'Pruning': <Scissors className="w-5 h-5 text-orange-500" />,
  'Health Checkup': <Stethoscope className="w-5 h-5 text-red-500" />,
  'General': <ClipboardList className="w-5 h-5 text-gray-500" />,
};

interface TaskTypeCardProps {
  distribution: Record<TaskType, number>;
}

const ORDERED_TASK_TYPES: TaskType[] = [
  'Watering',
  'Fertilizing',
  'Pruning',
  'Health Checkup',
  'General'
];

export function TaskTypeCard({ distribution }: TaskTypeCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200/50 h-full ml-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Task Types
      </h2>
      <div className="space-y-5">
        {ORDERED_TASK_TYPES.map((type) => {
           const count = distribution[type] || 0;
           if (count === 0) return null; 

           return (
          <div key={type} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {TASK_TYPE_ICONS[type]}
              <span className="text-gray-700 font-medium text-lg">{type}</span>
            </div>
            <span className="text-gray-900 font-bold text-lg">
              {count}
            </span>
          </div>
        )})}
      </div>
    </div>
  );
}