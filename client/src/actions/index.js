import axios from 'axios';

export const FETCH_ALL = 'fetch_all';
export const FETCH_USERS = 'fetch_users';
export const CREATE_USER = 'create_user';

export function fetchAllTasks() {
  const request = axios.get('/api/all');

  return {
    type: FETCH_ALL,
    payload: request
  };
}

export function fetchUsers() {
  const request = axios.get('/api/users');

  return {
    type: FETCH_USERS,
    payload: request
  }
}

export function createUser(values, callback) {
  const request = axios.post('/api/users', values)
    .then(() => callback());

  return {
    type: CREATE_USER,
    payload: request
  }
}