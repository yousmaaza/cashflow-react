import React from 'react';
import TransactionUpload from '../ui/TransactionUpload';

const TransactionsPage = () => {
  const handleUploadSuccess = (transactions) => {
    // Gérer les transactions uploadées ici
    console.log('Transactions uploaded:', transactions);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-1">Upload and manage your bank statements</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Import Bank Statement</h2>
        <TransactionUpload onUploadSuccess={handleUploadSuccess} />
      </div>
    </div>
  );
};

export default TransactionsPage;