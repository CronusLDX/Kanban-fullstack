import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { z } from 'zod';
import { TaskContext, TaskInfo } from '../interfaces/interface';
import { api, deleteMethod, postMethod, putMethod } from '../services/api';
import axios from 'axios';

export const TaskCreateContext = createContext<TaskContext | null>(null);

const taskSchema = z.object({
  id: z.number(),
  title: z.string().min(3, 'The title has to have at least 3 letters.'),
  description: z
    .string()
    .min(5, 'The description has to have at least 5 letters.'),
  status: z.enum(['Todo', 'Doing', 'Done']),
  priority: z.enum(['Low', 'Medium', 'High']),
});

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [task, setTask] = useState<TaskInfo[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTask(response.data);
      } catch (error) {
        setError(true);
        setErrorMessage('Error on getting the data');
        console.error('Error:', error);
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
        }
      }
    };
    getTasks();
  }, []);

  if (error) return <div className="error-message">{errorMessage}</div>;

  const deleteTask = async (taskId: string) => {
    try {
      await deleteMethod(taskId);
      setTask(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error(`Failed to delete task with ID ${taskId}:`, error);
    }
  };

  const createTask = async (data: Omit<TaskInfo, 'id'>) => {
    const validation = taskSchema.omit({ id: true }).safeParse(data);
    if (!validation.success) {
      console.error('Validation error:', validation.error.format());
      return { error: validation.error.format() };
    }

    try {
      const response = await postMethod(data);
      setTask(prevTask => [...prevTask, response]);
      return response;
    } catch (error) {
      console.error('Error creating task:', error);
      return { error: 'Failed to create task. Please try again.' };
    }
  };

  const updateTask = async (taskId: string) => {
    try {
      const allTasks = await Promise.all(
        task.map(async task => {
          if (task.id === taskId) {
            let updateStatus = task.status;
            if (task.status === 'Todo') {
              updateStatus = 'Doing';
            } else if (task.status === 'Doing') {
              updateStatus = 'Done';
            } else {
              updateStatus = 'Done';
            }

            const updatedTask = {
              ...task,
              status: updateStatus,
            };

            await putMethod(task.id, updatedTask);
            return updatedTask;
          }
          return task;
        })
      );

      setTask(allTasks);
    } catch (error) {
      console.error("Wasn't possible to update task's status", error);
    }
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
