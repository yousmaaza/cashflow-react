import axios from 'axios';
import { Transaction } from '@/data/mockTransactions';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonctions de transformation pour la compatibilité avec le backend
const transformToBackend = (transaction: Transaction) => ({
  ...transaction,
  description: transaction.libelle,
  amount: transaction.montant,
});

const transformFromBackend = (transaction: any): Transaction => ({
  ...transaction,
  libelle: transaction.description,
  montant: transaction.amount,
});

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

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  return response.data.map(transformFromBackend);
};

export const updateTransaction = async (id: string, transaction: Transaction) => {
  const backendTransaction = transformToBackend(transaction);
  const response = await api.put(`/transactions/${id}`, backendTransaction);
  return transformFromBackend(response.data);
};

export const deleteTransaction = async (id: string) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

export default api;