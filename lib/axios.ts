import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage when in browser environment
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('session');
      if (session) {
        try {
          const parsedSession = JSON.parse(session);
          if (parsedSession?.access_token) {
            config.headers.Authorization = `Bearer ${parsedSession.access_token}`;
          }
        } catch (error) {
          console.error('Error parsing session from localStorage:', error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status;

    // Handle specific error statuses
    if (statusCode === 401) {
      // Unauthorized: Clear session and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('session');
        localStorage.removeItem('user');
        window.location.href = '/signin';
      }
    }

    // Log errors in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('API Error:', error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 