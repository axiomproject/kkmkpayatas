import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import axios from 'axios'; // Add axios import
import "./index.css";
import "./styles/Layout.css";

// Configure axios with base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5175';
axios.defaults.baseURL = API_URL;

// Log the configured API URL
console.log('API Base URL:', axios.defaults.baseURL);

// Add request interceptor for authentication
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);