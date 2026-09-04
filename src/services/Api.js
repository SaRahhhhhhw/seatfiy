import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = (url, config) => api.get(url, config).then((res) => res.data);
export const post = (url, data, config) => api.post(url, data, config).then((res) => res.data);
export const patch = (url, data, config) => api.patch(url, data, config).then((res) => res.data);
export const put = (url, data, config) => api.put(url, data, config).then((res) => res.data);
export const del = (url, config) => api.delete(url, config).then((res) => res.data);

export default api;
