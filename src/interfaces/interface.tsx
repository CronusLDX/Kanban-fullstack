export type TaskStatus = 'Todo' | 'Doing' | 'Done';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface TaskInfo {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface TaskContext {
  task: TaskInfo[];
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string) => void;
  createTask: (task: TaskInfo) => void;
}
