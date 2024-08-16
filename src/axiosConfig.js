import axios from 'axios';
import Cookie from 'js-cookie';

const instance = axios.create({
  // baseURL: 'https://demo.servaapplabs.com:5000',
  baseURL:'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token from cookies to headers
instance.interceptors.request.use(
  (config) => {
    const token = Cookie.get('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
