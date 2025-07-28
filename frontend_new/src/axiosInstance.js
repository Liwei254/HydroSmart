// frontend_new/src/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',  // Backend server URL
  withCredentials: true,                 // Send cookies/tokens
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
