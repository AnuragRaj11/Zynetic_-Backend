import axios from 'axios';

const BASE_URL = 'https://books-api-lslo.onrender.com';

// Create axios instance with base config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all protected requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API calls
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post('/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Registration failed' };
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Logout failed' };
  }
};

// Book API calls
export const getBooks = async (page = 1, limit = 10, sortBy = '', order = 'asc') => {
  try {
    const response = await api.get('/getbooks', { 
      params: { page, limit, sortBy, order }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch books' };
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/getbook/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch book details' };
  }
};

export const filterBooks = async (filters = {}) => {
  try {
    const response = await api.get('/filterbooks', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to filter books' };
  }
};

export const searchBooks = async (title) => {
  try {
    const response = await api.get('/searchbooks', { params: { title } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to search books' };
  }
};

export default api;