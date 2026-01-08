const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const api = {
  // Auth
  register: async (name, email, password, role) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // Projects
  getProjects: async () => {
    const res = await fetch(`${API_URL}/projects`, { headers: getAuthHeader() });
    return res.json();
  },

  createProject: async (name, description) => {
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ name, description }),
    });
    return res.json();
  },

  deleteProject: async (id) => {
    await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
  },

  // Tasks
  getTasks: async () => {
    const res = await fetch(`${API_URL}/tasks`, { headers: getAuthHeader() });
    return res.json();
  },

  createTask: async (title, description, projectId, status) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ title, description, projectId, status }),
    });
    return res.json();
  },

  updateTask: async (id, data) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteTask: async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
  },

  addTagToTask: async (taskId, tagId) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}/tags/${tagId}`, {
      method: 'POST',
      headers: getAuthHeader(),
    });
    return res.json();
  },

  removeTagFromTask: async (taskId, tagId) => {
    await fetch(`${API_URL}/tasks/${taskId}/tags/${tagId}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
  },

  // Tags
  getTags: async () => {
    const res = await fetch(`${API_URL}/tags`, { headers: getAuthHeader() });
    return res.json();
  },

  createTag: async (name, color) => {
    const res = await fetch(`${API_URL}/tags`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ name, color }),
    });
    return res.json();
  },

  deleteTag: async (id) => {
    await fetch(`${API_URL}/tags/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
  },

  // Users
  getUsers: async () => {
    const res = await fetch(`${API_URL}/users`, { headers: getAuthHeader() });
    return res.json();
  },
};