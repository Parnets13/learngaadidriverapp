// API Configuration
// Backend is deployed on Render

const API_CONFIG = {
  // Production URL (Render deployment)
  BASE_URL: 'https://learngaadi-x496.onrender.com/api',
  
  // For local development (uncomment when testing locally)
  // BASE_URL: 'http://10.0.2.2:8781/api', // For Android Emulator
  // BASE_URL: 'http://192.168.1.18:8781/api', // For Real Device
  
  TIMEOUT: 60000, // 60 seconds (Render free tier needs more time for cold start)
};

export default API_CONFIG;
