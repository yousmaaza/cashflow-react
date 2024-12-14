import React, { useState } from 'react';
import TransactionUpload from '../ui/TransactionUpload';
import { Filter } from 'lucide-react';

const TransactionsPage = ({ transactions, onTransactionsUpdate, isLoading }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Upload failed');
      }

      await onTransactionsUpdate(); // Recharger les transactions
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR');
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">Gérez vos relevés bancaires et transactions</p>
        </div>
        <button className="px-4 py-2 flex items-center gap-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filtres
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Importer un relevé bancaire</h2>
        <TransactionUpload onUpload={handleFileUpload} />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Transactions récentes</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Montant</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Catégorie</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{formatDate(transaction.date)}</td>
                    <td className="px-4 py-2">{transaction.description}</td>
                    <td className={`px-4 py-2 text-right ${transaction.montant > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatAmount(transaction.montant)}
                    </td>
                    <td className="px-4 py-2">{transaction.type || '-'}</td>
                    <td className="px-4 py-2">{transaction.categorie || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Aucune transaction disponible
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;