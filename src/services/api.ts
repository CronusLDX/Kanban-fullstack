import axios from 'axios';
import { TaskInfo } from '../interfaces/interface';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});
export const postMethod = async (
  body: Omit<TaskInfo, 'id'>
): Promise<TaskInfo> => {
  try {
    const response = await api.post('/tasks', body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error on create the task', error);
    throw error;
  }
};

export const putMethod = async (
  taskId: string,
  updatedTask: TaskInfo
): Promise<void> => {
  try {
    await api.put(`/tasks/${taskId}`, updatedTask);
  } catch (error) {
    console.error(
      `Wasn't possible to update the task's status for taskId: ${taskId} with status: ${status}`,
      error
    );
  }
};

export const deleteMethod = async (id: string): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error(`Wasn't possible to delete task's id:${id}`, error);
  }
};
