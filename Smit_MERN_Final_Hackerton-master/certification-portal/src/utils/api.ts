// src/api/api.ts
import axios from 'axios';

// Create an instance of axios with a base URL for your backend API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', // Use environment variable or fallback to localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle Authentication API for Admin
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Student login API
export const studentLogin = async (rollNumber: string, password: string) => {
  try {
    const response = await api.post('/students/login', { rollNumber, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in as student:', error);
    throw error;
  }
};

// Fetch notifications for the admin
export const getNotifications = async () => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Generate certificate for a batch
export const generateCertificate = async (batchId: string) => {
  try {
    const response = await api.post(`/certificates/generate/${batchId}`);
    return response.data;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw error;
  }
};

// Fetch student details by roll number for certificate validation
export const getStudentByRollNumber = async (rollNumber: string) => {
  try {
    const response = await api.get(`/students/${rollNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw error;
  }
};

// Send certificate via email
export const sendCertificateByEmail = async (email: string, certificateId: string) => {
  try {
    const response = await api.post(`/certificates/send-email`, { email, certificateId });
    return response.data;
  } catch (error) {
    console.error('Error sending certificate via email:', error);
    throw error;
  }
};

// Fetch student dashboard data
export const getStudentDashboard = async (token: string) => {
  try {
    const response = await api.get('/students/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    throw error;
  }
};

// Download certificate for a student
export const downloadCertificate = async (rollNumber: string) => {
  try {
    const response = await api.get(`/students/download-certificate/${rollNumber}`, {
      responseType: 'blob', // Expect a PDF file
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading certificate:', error);
    throw error;
  }
};
