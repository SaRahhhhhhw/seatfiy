import { get, post } from './Api';

export function login(credentials) {
  return post('/auth/login', credentials);
}

export function register(userData) {
  return post('/auth/register', userData);
}

export function getMe() {
  return get('/auth/me').then((res) => res.user);
}

export function saveSession(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
}

export function getCurrentUser() {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('token'));
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
