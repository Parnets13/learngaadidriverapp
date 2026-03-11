import axios from 'axios';
import API_CONFIG from '../config';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  config => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    console.log('Full URL:', config.baseURL + config.url);
    return config;
  },
  error => {
    console.log('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => {
    console.log('API Success:', response.status, response.config.url);
    return response;
  },
  error => {
    if (error.response) {
      // Server responded with error status
      console.log('API Error:', `Request failed with status code ${error.response.status}`);
      console.log('Error details:', error.response.data);
      console.log('Request URL:', error.config.url);
    } else if (error.request) {
      // Request made but no response
      console.log('API Error: Network Error');
      console.log('No response received from server');
      console.log('Request URL:', error.config?.url);
      console.log('Possible reasons:');
      console.log('1. Server is down or sleeping (Render free tier)');
      console.log('2. Network connection issue');
      console.log('3. Request timeout (current:', API_CONFIG.TIMEOUT / 1000, 'seconds)');
    } else {
      // Error in request setup
      console.log('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
