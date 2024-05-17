import axios from 'axios';

const api = axios.create({
  baseURL: 'http://yourdomain', // 替换为您的API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;