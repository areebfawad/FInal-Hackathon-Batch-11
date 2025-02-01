import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://backend1-six-kappa.vercel.app/api', // Fallback base URL
  timeout: 15000, // Timeout after 15 seconds
});

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
  async (error) => {
    console.error('API Error:', error.response || error.message);

    if (error.code === 'ECONNABORTED' || error.response?.status === 504) {
      console.warn('Retrying request...');
      return API(error.config); // Retry request for 504 Gateway Timeout
    }

    return Promise.reject(error.response?.data?.message || 'Something went wrong');
  }
);

// User APIs
export const getUserDetails = (userId) => API.get(`/auth/profile/${userId}`);
export const updateUserDetails = (userId, data) => API.put(`/auth/profile/${userId}`, data);
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const googleAuth = (token) => API.post('/auth/google', { token });

// Loan APIs
export const getLoans = (userId) => API.get(`/loans?userId=${userId}`);
export const submitLoan = (data) => API.post('/loans', data);
export const downloadSlip = (token) => API.get(`/loans/slip/${token}`, { responseType: 'blob' });
export const repayLoan = (loanId, data) => API.post(`/loans/${loanId}/repayment`, data);
export const getLoanSlipDetails = (slipId) => API.get(`/loans/slip/details/${slipId}`);

// Admin APIs
export const getAllLoans = (filters) => API.get('/admin/loans', { params: filters }); // Filters include status, category, etc.
export const updateLoanStatus = (loanId, data) => API.put(`/admin/loans/${loanId}`, data);
export const scheduleAppointment = (loanId, data) => API.post(`/admin/loans/${loanId}/schedule`, data);

// Notifications API
export const getNotifications = (userId) => API.get(`/notifications?userId=${userId}`);
export const createNotification = (data) => API.post('/notifications', data);

// Loan Slip APIs
export const getLoanSlips = async () => {
  try {
    const response = await API.get('/loans/slips');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch loan slips:', error);
    throw error;
  }
};

export const sendContactForm = async (data) => {
  try {
    const response = await API.post('/contact', data);
    return response.data;
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error.response?.data?.message || 'Failed to send contact form.';
  }
};

export const SlipDownload = async (loanId) => {
  try {
    const response = await API.get(`/loan-slips/download/${loanId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Failed to download slip:', error);
    throw error;
  }
};

// General API utility functions
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

export default API;
