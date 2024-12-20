import axios from 'axios';
import { Transaction } from '@/data/mockTransactions';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  return response.data;
};

export const updateTransaction = async (id: string, transaction: Transaction) => {
  const response = await api.put(`/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  await api.delete(`/transactions/${id}`);
};

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
export const getCategories = async (): Promise<string[]> => {
    const response = await api.get('/transaction-categories');
    return response.data;
    };
export const getPaymentTypes = async (): Promise<string[]> => {
    const response = await api.get('/transaction-types');
    return response.data;
    };

export default api;