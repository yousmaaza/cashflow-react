import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import TransactionUpload from '../ui/TransactionUpload';
import { Filter, Save, X, Trash } from 'lucide-react';
import PropTypes from 'prop-types';
import { useLoading } from '../contexts/LoadingContext';
import LoadingIndicator from '../ui/LoadingIndicator';

const TransactionsPage = ({
  transactions,
  onTransactionsUpdate,
  isLoading,
  filters,
  setFilters,
  resetFilters
}) => {
  const { setIsProcessing } = useLoading();
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [toast, setToast] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFileProcessing, setIsFileProcessing] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('http://localhost:8000/transaction-types');
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error('Error fetching transaction types:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/transaction-categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching transaction categories:', error);
      }
    };

    fetchTypes();
    fetchCategories();
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setIsFileProcessing(true);

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
    } finally {
      setIsFileProcessing(false);
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
        throw new Error('Échec de la suppression de la transaction');
      }

      await onTransactionsUpdate();
      showToast('Transaction supprimée avec succès', 'success');
    } catch (error) {
      console.error('Erreur de suppression :', error);
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
                  if (e.target.value === '_new_') {
                    setShowNewCategory(true);
                    setEditValue('');
                  } else {
                    setEditValue(e.target.value);
                  }
                }}
                className="w-full border border-gray-300 rounded-sm p-1 text-sm"
                autoFocus
              >
                <option value="_default">Sélectionner</option>
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
              <option value="_default">Sélectionner</option>
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

  const applyFilters = () => {
    setIsFilterModalOpen(false);
  };

  // Trier les transactions par date avant l'affichage
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="p-6 space-y-6">
      <LoadingIndicator isLoading={isFileProcessing} />
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
          <p className="text-gray-600 mt-1">
            {transactions.length} transaction(s)
          </p>
        </div>

        <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtres
              {Object.values(filters).some(v => v) && (
                <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {Object.values(filters).filter(v => v).length}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Filtrer les transactions</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Période
                </label>
                <DayPicker
                  mode="range"
                  selected={filters.dateRange}
                  onSelect={(range) => setFilters(prev => ({ ...prev, dateRange: range }))}
                  className="rounded-md border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de transaction
                </label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_default">Sélectionner</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_default">Sélectionner</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant min
                  </label>
                  <input
                    type="number"
                    value={filters.minAmount}
                    onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                    className="border border-gray-300 rounded-sm p-1 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant max
                  </label>
                  <input
                    type="number"
                    value={filters.maxAmount}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                    className="border border-gray-300 rounded-sm p-1 text-sm w-full"
                  />
                </div>
              </div>

              <div className="col-span-2 flex justify-between">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Réinitialiser
                </Button>
                <Button onClick={applyFilters}>
                  Appliquer les filtres
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
        ) : sortedTransactions.length > 0 ? (
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
                {sortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{formatDate(transaction.date)}</td>
                    <td className="px-4 py-2">{transaction.libelle}</td>
                    <td className={`px-4 py-2 text-right ${transaction.montant < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatAmount(transaction.montant)}
                    </td>
                    <td className="px-4 py-2">{renderEditableCell(transaction, 'type', transaction.type, types)}</td>
                    <td className="px-4 py-2">{renderEditableCell(transaction, 'categorie', transaction.categorie, categories)}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                      >
                        <Trash size={16} />
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

TransactionsPage.propTypes = {
  transactions: PropTypes.array.isRequired,
  onTransactionsUpdate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};

export default TransactionsPage;