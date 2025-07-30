// frontend_new/src/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.207.1:5000/api',  // Backend server URL
  withCredentials: true,                 // Send cookies/tokens
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Interceptor: Inject token from localStorage into Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token injected into request:', token);  // Debug log
    }
    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

export default instance;
