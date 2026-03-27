import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5030/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request/response logging
api.interceptors.request.use(
  (config) => {
    console.log('[API Request]', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
      withCredentials: config.withCredentials,
    });
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('[API Response]', {
      url: response.config.url,
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.error('[API Response Error]', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const landsApi = {
  getLands: () => api.get('/lands'),
  getLand: (slug) => api.get(`/lands/${slug}`),
  createLand: (data) => api.post('/lands', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateLand: (id, data) => api.put(`/lands/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteLand: (id) => api.delete(`/lands/${id}`),
};

export const blogsApi = {
  getBlogs: () => api.get('/blogs'),
  getBlog: (slug) => api.get(`/blogs/${slug}`),
  createBlog: (data) => api.post('/blogs', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateBlog: (id, data) => api.put(`/blogs/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
};

export const customersApi = {
  getCustomers: () => api.get('/customers'),
  createCustomer: (data) => api.post('/customers', data),
  deleteCustomer: (id) => api.delete(`/customers/${id}`),
};

export default api;