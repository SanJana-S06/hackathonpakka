export interface Task {
  _id: string;
  // id: string;
  sectionId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedMember: string;
  task:string;
}

export interface Section {
  id: string;
  projectId: string;
  name: string;
  orderIndex: number;
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export type ViewMode = 'list' | 'kanban';
