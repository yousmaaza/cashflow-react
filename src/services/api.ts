import axios from 'axios';
import { Transaction } from '@/data/mockTransactions';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction pour transformer les données du backend vers le frontend
const transformBackendToFrontend = (backendTransaction: any): Transaction => ({
  id: backendTransaction.id,
  date: backendTransaction.date,
  libelle: backendTransaction.description,
  montant: backendTransaction.amount,
  categorie: backendTransaction.category,
  type: backendTransaction.type,
});

// Fonction pour transformer les données du frontend vers le backend
const transformFrontendToBackend = (transaction: Transaction) => ({
  id: transaction.id,
  date: transaction.date,
  description: transaction.libelle,
  amount: transaction.montant,
  category: transaction.categorie,
  type: transaction.type,
});

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  return response.data.map(transformBackendToFrontend);
};

export const updateTransaction = async (id: string, transaction: Transaction) => {
  const backendData = transformFrontendToBackend(transaction);
  const response = await api.put(`/transactions/${id}`, backendData);
  return transformBackendToFrontend(response.data);
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
  return response.data.map(transformBackendToFrontend);
};