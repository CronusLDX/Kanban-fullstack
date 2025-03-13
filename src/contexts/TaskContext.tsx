import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { z } from 'zod';
import { TaskContext, TaskInfo } from '../interfaces/interface';

export const TaskCreateContext = createContext<TaskContext | null>(null);

const taskSchema = z.object({
  id: z.number(),
  title: z.string().min(3, 'The title has to have at least 3 letters.'),
  description: z
    .string()
    .min(5, 'The description has to have at least 5 letters.'),
  status: z.enum(['todo', 'doing', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
});

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [task, setTask] = useState<TaskInfo[]>(() => {
    const storagedItems = localStorage.getItem('taskItems');
    return storagedItems ? JSON.parse(storagedItems) : [];
  });
  useEffect(() => {
    localStorage.setItem('taskItems', JSON.stringify(task));
  }, [task]);

  const deleteTask = (taskId: number): void => {
    setTask(prevTask => prevTask.filter(t => t.id !== taskId));
  };

  const createTask = (data: Omit<TaskInfo, 'id'>) => {
    const newTask = {
      ...data,
      id: Date.now(),
    };
    const result = taskSchema.safeParse(newTask);

    if (!result.success) {
      console.error('Error:' + result.error.format());
    }

    setTask(prevTask => [...prevTask, newTask]);
    console.log(newTask);
  };

  const updateTask = (taskId: number): void => {
    setTask(prevTask =>
      prevTask.map(task =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === 'todo'
                  ? 'doing'
                  : task.status === 'doing'
                  ? 'done'
                  : 'done',
            }
          : task
      )
    );
  };

  return (
    <TaskCreateContext.Provider
      value={{ task, deleteTask, updateTask, createTask }}
    >
      {children}
    </TaskCreateContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskCreateContext);
  if (!context) {
    throw new Error(
      'There´s something wrong with the Application´s context, try again later'
    );
  }
  return context;
};
