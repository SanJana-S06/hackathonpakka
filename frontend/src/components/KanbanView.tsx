import { Task } from '../../types';
import TaskCard from './TaskCard';

interface KanbanViewProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onTaskClick: (task: Task) => void;
}

const columns: { status: Task['status']; label: string; color: string }[] = [
  { status: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { status: 'in_progress', label: 'In Progress', color: 'bg-blue-100' },
  { status: 'done', label: 'Done', color: 'bg-green-100' }
];

export default function KanbanView({ tasks, onStatusChange, onTaskClick }: KanbanViewProps) {
  return (
    <div className="grid p-6 grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(column => {
        const columnTasks = tasks.filter(task => task.status === column.status);

        return (
          <div key={column.status} className="flex flex-col">
            <div className={`${column.color} rounded-lg p-4 mb-4`}>
              <h3 className="font-bold text-gray-800 flex items-center justify-between">
                <span>{column.label}</span>
                <span className="text-sm bg-white px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </h3>
            </div>

            <div className="flex-1 space-y-3">
              {columnTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                  onClick={() => onTaskClick(task)}
                />
              ))}

            </div>
          </div>
        );
      })}
    </div>
  );
}
