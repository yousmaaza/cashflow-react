import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Dashboard from './ui/Dashboard';
import Logo from './Logo';

const BankApp = () => {
  const [mode, setMode] = useState('choice'); // 'choice', 'upload', 'view'
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = React.useRef(null);

  // Gestion du fichier PDF
  const handleDrop = async (file) => {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files are allowed');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process PDF');
      }

      const data = await response.json();
      setTransactions(data.transactions);
      setMode('view');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsDragActive(false);
    }
  };

  // Charger les données existantes
  const loadExistingData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/transactions/');
      if (!response.ok) {
        throw new Error('Failed to load transactions');
      }
      const data = await response.json();
      setTransactions(data);
      setMode('view');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Mise à jour d'une transaction
  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      const updateData = {
        type: updatedTransaction.type,
        categorie: updatedTransaction.categorie
      };

      const response = await fetch(`http://localhost:8000/transactions/${updatedTransaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update transaction');
      }

      setTransactions(prevTransactions =>
        prevTransactions.map(t =>
          t.id === updatedTransaction.id
            ? { ...t, ...updateData }
            : t
        )
      );

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Suppression d'une transaction
  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`http://localhost:8000/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      setTransactions(prevTransactions =>
        prevTransactions.filter(t => t.id !== transactionId)
      );

      return true;
    } catch (error) {
      setError('Failed to delete transaction: ' + error.message);
      return false;
    }
  };

  if (mode === 'view' && transactions.length > 0) {
    return (
      <Dashboard
        transactions={transactions}
        onUpdateTransaction={handleUpdateTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Logo size="xl" className="animate-bounce-slow" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Bank Statement Analyzer
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {mode === 'choice'
              ? 'Choose an option to begin'
              : mode === 'upload'
                ? 'Upload your bank statement'
                : 'Viewing transactions'}
          </p>
        </div>

        {/* Écran de choix */}
        {mode === 'choice' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
            <button
              onClick={() => setMode('upload')}
              className="group p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border-2 border-transparent hover:border-blue-500"
            >
              <div className="p-4 rounded-full bg-blue-50 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload New PDF</h3>
              <p className="text-gray-600">Process a new bank statement</p>
            </button>

            <button
              onClick={loadExistingData}
              className="group p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border-2 border-transparent hover:border-green-500"
            >
              <div className="p-4 rounded-full bg-green-50 w-16 h-16 mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                <Upload className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">View Existing Data</h3>
              <p className="text-gray-600">Browse previously processed statements</p>
            </button>
          </div>
        )}

        {/* Zone d'upload */}
        {mode === 'upload' && (
          <>
            <div
              className={`relative overflow-hidden rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                ${isDragActive 
                  ? 'border-2 border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                  : 'border-2 border-gray-200 hover:border-blue-400 bg-white shadow-md hover:shadow-lg'
                }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                handleDrop(file);
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleDrop(e.target.files[0])}
                accept=".pdf"
                className="hidden"
              />
              <div className="flex flex-col items-center gap-4">
                <div className={`p-4 rounded-full bg-blue-50 transition-transform duration-300 ${
                  isDragActive ? 'transform rotate-12' : ''
                }`}>
                  <Upload className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {isDragActive ? "Drop your PDF here" : "Upload your bank statement"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Drag and drop your PDF file, or click to browse
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMode('choice')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to options
            </button>
          </>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center p-8 bg-white rounded-xl shadow-md">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Processing...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default BankApp;