import { Calendar, User } from 'lucide-react';
import { Task } from "../../types";
import{Trash} from 'lucide-react';
interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onClick: () => void;
}

const statusColors = {
  todo: 'bg-gray-200 text-gray-700',
  in_progress: 'bg-blue-200 text-blue-700',
  done: 'bg-green-200 text-green-700'
};

const statusLabels = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done'
};

const priorityColors = {
  low: 'bg-green-300 border border-green-500',
  medium: 'bg-blue-300 border border-blue-500',
  high: 'bg-red-300 border border-red-500'
};
const StatusColors = {
  todo: 'bg-gray-100',
  in_progress: 'bg-blue-100',
  done: 'bg-green-100'
};


export default function TaskCard({ task, onStatusChange, onClick }: TaskCardProps) {
 return (
  <div
    onClick={onClick}
    className={`rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer ${StatusColors[task.status]}`}
  >
    <div className="flex items-start justify-between mb-3">
     <div className='flex'>
       <div>
         <h3 className="font-semibold m-2 text-gray-800 flex">{task.title}</h3>
       </div>
        <button
          className="m-2 p-1 rounded-md text-gray-500 hover:text-red-500 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash size={16} />
        </button>
      </div>
      <div
        className={`flex items-center justify-center text-white gap-1 px-2 py-1 border-2 rounded-md text-sm font-semibold ${priorityColors[task.priority]}`}
      >
        <span className="capitalize">{task.priority}</span>
      </div>
    </div>

    {task.description && (
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
    )}

    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
      {task.dueDate && (
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      )}
      {task.assignedMember && (
        <div className="flex items-center gap-1">
          <User size={14} />
          <span>{task.assignedMember}</span>
        </div>
      )}
    </div>

    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {(["todo", "in_progress", "done"] as Task["status"][]).map((status) => (
        <div
          key={status}
          onClick={() => onStatusChange(task._id, status)}
          className={`px-3 py-2 rounded-full text-xs font-medium cursor-pointer transition-colors
            ${statusColors[status]} 
            ${task.status === status ? "ring-2 ring-offset-1 ring-blue-400" : ""}
          `}
        >
          {statusLabels[status]}
        </div>
      ))}
    </div>
  </div>
);

}
