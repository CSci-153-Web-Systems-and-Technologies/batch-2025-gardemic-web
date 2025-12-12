import { formatDistanceToNow } from 'date-fns';

interface NotificationCardProps {
  type: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function NotificationCard({ type, title, message, createdAt, isRead }: NotificationCardProps) {
  
  const getTagStyle = (type: string) => {
    switch (type) {
      case 'Task Creation': return 'bg-purple-100 text-purple-600';
      case 'Garden Creation': return 'bg-green-100 text-green-600';
      case 'Task Reminder': return 'bg-orange-100 text-orange-600';
      case 'Auth Event': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`p-6 border-b border-gray-100 bg-white ${!isRead ? 'bg-blue-50/30' : ''} hover:bg-gray-50 transition-colors`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${getTagStyle(type)}`}>
          {type}
        </span>
        <span className="text-gray-400 text-xs font-medium">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
      
      <h3 className="text-gray-900 font-semibold text-sm mb-1">
        {title}
      </h3>
      
      <p className="text-gray-500 text-sm leading-relaxed">
        {message}
      </p>
    </div>
  );
}