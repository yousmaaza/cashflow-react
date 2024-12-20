import { useState, useEffect } from 'react';
import axios from 'axios';
import { Transaction } from '@/data/mockTransactions';

const API_URL = 'http://localhost:8000';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<string[]>([]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/transactions`);
      setTransactions(response.data);
      
      // Extract unique categories and payment types
      const uniqueCategories = [...new Set(response.data.map((t: Transaction) => t.category))];
      const uniquePaymentTypes = [...new Set(response.data.map((t: Transaction) => t.type))];
      
      setCategories(['Tous', ...uniqueCategories]);
      setPaymentTypes(['Tous', ...uniquePaymentTypes]);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    try {
      await axios.put(`${API_URL}/transactions/${transaction.id}`, transaction);
      await fetchTransactions(); // Refresh the list after update
      return true;
    } catch (err) {
      setError('Erreur lors de la mise à jour de la transaction');
      console.error('Error updating transaction:', err);
      return false;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      await fetchTransactions(); // Refresh the list after delete
      return true;
    } catch (err) {
      setError('Erreur lors de la suppression de la transaction');
      console.error('Error deleting transaction:', err);
      return false;
    }
  };

  const uploadPDF = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await axios.post(`${API_URL}/upload-pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      await fetchTransactions(); // Refresh the list after upload
      return true;
    } catch (err) {
      setError('Erreur lors du chargement du fichier PDF');
      console.error('Error uploading PDF:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    categories,
    paymentTypes,
    loading,
    error,
    updateTransaction,
    deleteTransaction,
    uploadPDF,
  };
};
