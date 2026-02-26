import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
});

export const getTasks = (params) => api.get('/tasks', { params });
export const getTask = (id) => api.get(`/tasks/${id}`);
export const createTask = (data) => api.post('/tasks', { task: data });
export const updateTask = (id, data) => api.patch(`/tasks/${id}`, { task: data });
export const deleteTask = (id) => api.delete(`/tasks/${id}`);