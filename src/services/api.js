import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: 'https://your-backend-url.com/api',
  timeout: 10000, // Set timeout to prevent hanging requests
});

export const getLoanSlips = async () => {
  return {
    data: [
      {
        id: '12345',
        type: 'Education Loan',
        date: '2025-01-01',
        amount: 50000,
      },
      {
        id: '67890',
        type: 'Wedding Loan',
        date: '2025-01-15',
        amount: 200000,
      },
    ],
  };
};

export const SlipDownload = async (loanId) => {
  return axios.get(`/loan-slips/download/${loanId}`, {
    responseType: 'blob',
  });
};

// Automatically attach authorization token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler for API responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    // You can add custom error transformation here
    return Promise.reject(error.response?.data?.message || 'Something went wrong');
  }
);

// User APIs
export const getUserDetails = (userId) => API.get(`/auth/profile/${userId}`);
export const updateUserDetails = (userId, data) =>
  API.put(`/auth/profile/${userId}`, data);
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const googleAuth = (token) => API.post('/auth/google', { token });

// Loan APIs
export const getLoans = (userId) => API.get(`/loans?userId=${userId}`);
export const submitLoan = (data) => API.post('/loans', data);
export const downloadSlip = (token) =>
  API.get(`/loans/slip/${token}`, { responseType: 'blob' });
export const repayLoan = (loanId, data) =>
  API.post(`/loans/${loanId}/repayment`, data);

// Admin APIs
export const getAllLoans = (filters) =>
  API.get('/admin/loans', { params: filters }); // Filters can include status, category, etc.
export const updateLoanStatus = (loanId, data) =>
  API.put(`/admin/loans/${loanId}`, data);
export const scheduleAppointment = (loanId, data) =>
  API.post(`/admin/loans/${loanId}/schedule`, data);

// Notifications API
export const getNotifications = (userId) =>
  API.get(`/notifications?userId=${userId}`);
export const createNotification = (data) =>
  API.post('/notifications', data);

// General API utility
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

export default API;
