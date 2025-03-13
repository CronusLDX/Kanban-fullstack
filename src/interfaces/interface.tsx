export type TaskStatus = 'todo' | 'doing' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskInfo {
  id?: number | undefined;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface TaskContext {
  task: TaskInfo[];
  deleteTask: (taskId: number) => void;
  updateTask: (taskId: number) => void;
  createTask: (task: TaskInfo) => void;
}
