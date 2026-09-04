import { get, post, patch, del } from './Api';

export function getUsers(params) {
  return get('/users', { params }).then((res) => res.users);
}

export function addUser(userData) {
  return post('/users', userData).then((res) => res.user);
}

export function updateUserStatus(id, status) {
  return patch(`/users/${id}/status`, status ? { status } : {}).then((res) => res.user);
}

export function updateUserRole(id, role) {
  return patch(`/users/${id}/role`, { role }).then((res) => res.user);
}

export function deleteUser(id) {
  return del(`/users/${id}`);
}
