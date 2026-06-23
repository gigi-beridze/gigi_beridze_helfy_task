const BASE_URL = 'http://localhost:4000/api/tasks';
const jsonHeaders = { 'Content-Type': 'application/json' };

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return res.json();
}

export function getTasks() {
  return fetch(BASE_URL).then(handleResponse);
}

export function createTask(data) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function updateTask(id, data) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function deleteTask(id) {
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(handleResponse);
}

export function toggleTask(id) {
  return fetch(`${BASE_URL}/${id}/toggle`, { method: 'PATCH' }).then(handleResponse);
}
