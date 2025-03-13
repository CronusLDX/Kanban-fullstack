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

export const deleteMethod = async (id: number): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error(`Wasn't possible to delete task's id:${id}`, error);
  }
};
