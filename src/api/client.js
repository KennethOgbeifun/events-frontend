import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API, 
});

// Add Authorization header from localStorage token (if present)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
