import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Adjust this to match your FastAPI backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post('/upload-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const updateTransaction = async (id: number, updates: any) => {
  try {
    const response = await api.put(`/transactions/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};
