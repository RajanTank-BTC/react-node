import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});


client.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default client;