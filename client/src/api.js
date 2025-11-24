const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

async function request(path, method='GET', body=null, token=null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export async function login(email, password) {
  return request('/auth/login', 'POST', { email, password });
}
export async function fetchTasks(token) {
  return request('/tasks', 'GET', null, token);
}
export async function createTask(body, token) {
  return request('/tasks', 'POST', body, token);
}
export async function updateTask(id, body, token) {
  return request(`/tasks/${id}`, 'PUT', body, token);
}
export async function deleteTask(id, token) {
  return request(`/tasks/${id}`, 'DELETE', null, token);
}
