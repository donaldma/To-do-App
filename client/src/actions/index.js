import axios from 'axios';

export const FETCH_ALL = 'fetch_all';
export const FETCH_USERS = 'fetch_users';
export const CREATE_USER = 'create_user';
export const DELETE_USER = 'delete_user';
export const USER_TASKS = 'user_tasks';
export const TOGGLE_TRUE = 'toggle_true';
export const TOGGLE_FALSE = 'toggle_false';
export const CREATE_TASK = 'create_task';
export const DELETE_TASK = 'delete_task';
export const EDIT_TASK = 'edit_task';
export const SEARCH_USER = 'search_user';

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

export function selectUserTasks(id) {
  const request = axios.get(`/api/tasks?user_id=${id}`);
  
  return {
    type: USER_TASKS,
    payload: request
  };
}

export function createTask(values, id, callback) {
  const request = axios.post(`/api/tasks/${id}`, values)
    .then(() => callback());
  
  return {
    type: CREATE_TASK,
    payload: request
  }
}

export function toggleCompletedTrue(task, id, callback) {
  const request = axios.post(`/api/updateTrue?task_id=${task.id}`)
    .then(() => callback());
  
  return {
    type: TOGGLE_TRUE,
    payload: request
  }
}

export function toggleCompletedFalse(task, id, callback) {
  const request = axios.post(`/api/updateFalse?task_id=${task.id}`)
    .then(() => callback());    
  
  return {
    type: TOGGLE_FALSE,
    payload: request
  }
}

export function deleteUser(id, callback) {
  const request = axios.delete(`/api/users/${id}`)
    .then(() => callback());

  return {
    type: DELETE_USER,
    payload: id
  }
}

export function deleteTask(task, id, callback) {
  const request = axios.delete(`/api/tasks/${task.id}`)
    .then(() => callback());

  return {
    type: DELETE_TASK,
    payload: request
  }
}

export function editTask(values, task, callback) {
  const request = axios.post(`/api/task/edit/${id}`, values)
    .then(() => callback());

  return {
    type: EDIT_TASK,
    payload: request
  }
}

export function searchUser(name, callback) {
  const request = axios.get(`/api/users/search/${name}`)
    // .then(() => callback());

  return {
    type: SEARCH_USER,
    payload: request
  }
}

// export function clearSearch(name, callback) {
//   const request = axios.get(`/api/users/search/${name}`)
//     // .then(() => callback());

//   return {
//     type: SEARCH_USER,
//     payload: request
//   }
// }