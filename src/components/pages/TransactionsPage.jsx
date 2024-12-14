import React, { useState } from 'react';
import TransactionUpload from '../ui/TransactionUpload';
import { Filter, Save, X, Plus } from 'lucide-react';

const TransactionsPage = ({ transactions, onTransactionsUpdate, isLoading }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [toast, setToast] = useState(null);

  const types = ['Dépense', 'Revenu', 'Transfert'];
  const categories = [
    'Alimentation',
    'Transport',
    'Logement',
    'Loisirs',
    'Santé',
    'Services',
    'Shopping',
    'Education',
    'Revenus',
    'Investissements',
    'Autres'
  ];

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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

      await onTransactionsUpdate();
      showToast('Fichier importé avec succès', 'success');
    } catch (error) {
      console.error('Upload error:', error);
      showToast('Erreur lors de l\'import: ' + error.message, 'error');
    }
  };

  const handleDelete = async (transactionId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8000/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      await onTransactionsUpdate();
      showToast('Transaction supprimée avec succès', 'success');
    } catch (error) {
      console.error('Delete error:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const startEditing = (transactionId, field, currentValue) => {
    setEditingCell({ id: transactionId, field });
    setEditValue(currentValue || '');
  };

  const cancelEditing = () => {
    setEditingCell(null);
    setEditValue('');
    setShowNewCategory(false);
  };

  const handleSave = async (transactionId) => {
    try {
      const value = showNewCategory ? editValue : editValue;
      const field = editingCell.field;
      
      const response = await fetch(`http://localhost:8000/transactions/${transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      await onTransactionsUpdate();
      showToast('Transaction mise à jour avec succès', 'success');
    } catch (error) {
      console.error('Update error:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    } finally {
      cancelEditing();
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

  const renderEditableCell = (transaction, field, currentValue, options) => {
    const isEditing = editingCell?.id === transaction.id && editingCell?.field === field;

    if (isEditing) {
      return (
        <div className="flex items-center gap-1">
          {field === 'categorie' && !showNewCategory ? (
            <div className="flex flex-col w-full gap-1">
              <select
                value={editValue}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '_new_') {
                    setShowNewCategory(true);
                    setEditValue('');
                  } else {
                    setEditValue(value);
                  }
                }}
                className="w-full border border-gray-300 rounded-sm p-1 text-sm"
                autoFocus
              >
                <option value="">Sélectionner</option>
                {options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
                <option value="_new_">+ Nouvelle catégorie</option>
              </select>
            </div>
          ) : field === 'type' ? (
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="border border-gray-300 rounded-sm p-1 text-sm"
              autoFocus
            >
              <option value="">Sélectionner</option>
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="border border-gray-300 rounded-sm p-1 text-sm"
              autoFocus
            />
          )}
          <button
            onClick={() => handleSave(transaction.id)}
            className="p-1 hover:bg-green-100 rounded-sm text-green-600"
            title="Enregistrer"
          >
            <Save size={16} />
          </button>
          <button
            onClick={cancelEditing}
            className="p-1 hover:bg-red-100 rounded-sm text-red-600"
            title="Annuler"
          >
            <X size={16} />
          </button>
        </div>
      );
    }

    const displayValue = currentValue || '-';
    return (
      <div 
        onClick={() => startEditing(transaction.id, field, currentValue)}
        className="cursor-pointer hover:bg-gray-100 rounded p-1 flex items-center gap-1"
      >
        {field === 'type' ? (
          <span className={`px-2 py-1 rounded-full text-xs font-medium
            ${displayValue === 'Dépense' ? 'bg-red-100 text-red-800' :
              displayValue === 'Revenu' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'}`}>
            {displayValue}
          </span>
        ) : field === 'categorie' ? (
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            {displayValue}
          </span>
        ) : displayValue}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
          toast.type === 'error' ? 'bg-red-100 text-red-800' :
          toast.type === 'success' ? 'bg-green-100 text-green-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {toast.message}
        </div>
      )}

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
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{formatDate(transaction.date)}</td>
                    <td className="px-4 py-2">{transaction.libelle}</td>
                    <td className={`px-4 py-2 text-right ${transaction.montant > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatAmount(transaction.montant)}
                    </td>
                    <td className="px-4 py-2">
                      {renderEditableCell(transaction, 'type', transaction.type, types)}
                    </td>
                    <td className="px-4 py-2">
                      {renderEditableCell(transaction, 'categorie', transaction.categorie, categories)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="p-1 hover:bg-red-50 rounded-full"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </td>
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