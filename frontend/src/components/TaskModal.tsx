import { useState } from 'react';
import type React from 'react';
import { Task } from '../../types';
import Modal from './Modal';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
 onSave: (task: Omit<Task, '_id'>) => void;
 sectionId: string;
  initialTask?: Task;
}

export default function TaskModal({ isOpen, onClose, onSave, sectionId, initialTask }: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    status: initialTask?.status || 'todo' as Task['status'],
    priority: initialTask?.priority || 'medium' as Task['priority'],
    dueDate: initialTask?.dueDate || '',
    assignedMember: initialTask?.assignedMember || ''
  });
  const [taskStatus, setTaskStatus] = useState("Add")
  const handleTaskStatusChange = () => {
    if (initialTask) {
      setTaskStatus("Add");
      console.log(initialTask);
    } else {
      setTaskStatus("Edit");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    handleTaskStatusChange();
    console.log(taskStatus);
    // console.log(`${initialTask?._id}`);
    e.preventDefault();

    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      sectionId: initialTask?.sectionId || sectionId
    } as Omit<Task, 'id'>);

  // Reset form
  setFormData({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignedMember: ''
  });
  onClose();

    try {
      if (taskStatus === "Add") {
        const res = await fetch('/api/v1/tasks/createTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            sectionId: initialTask?.sectionId || sectionId
          })
        });
        const data = await res.json();
        console.log(data.data._id);
        console.log()
        setMsg(data.message);
      }
      else if (taskStatus === "Edit") {
        const res = await fetch(`/api/v1/tasks/updateTask/${initialTask?._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            sectionId: initialTask?.sectionId || sectionId
          })
        });
        const data = await res.json();
        setMsg(data.message);
      }
      // const res = await fetch('/api/v1/tasks/createTask', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //       ...formData,
      //       sectionId: initialTask?.sectionId || sectionId
      //     })
      // });
      // const data = await res.json();
      // console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialTask ? 'Edit Task' : 'Add New Task'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter task description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Assigned Member
          </label>
          <input
            type="text"
            value={formData.assignedMember}
            onChange={(e) => setFormData({ ...formData, assignedMember: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter member name"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border bg-gray-300  border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {initialTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
function setMsg(message: any): any {
  throw new Error('Function not implemented.');
}

