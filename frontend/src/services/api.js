import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Pitch APIs
export const pitchAPI = {
  getAll: () => api.get('/pitches'),
  getById: (id) => api.get(`/pitches/${id}`),
  create: (data) => api.post('/pitches', data),
  update: (id, data) => api.put(`/pitches/${id}`, data),
  delete: (id) => api.delete(`/pitches/${id}`),
  getMyPitches: () => api.get('/pitches/my-pitches'),
  getAllForAdmin: () => api.get('/pitches/admin/all'),
  approve: (id) => api.put(`/pitches/admin/${id}/approve`),
};

export default api;
