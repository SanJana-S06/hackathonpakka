interface ProgressBarProps {
  total: number;
  completed: number;
}

export default function ProgressBar({ total, completed }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Progress</span>
        <span className="font-semibold text-gray-800">
          {completed} of {total} completed ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
