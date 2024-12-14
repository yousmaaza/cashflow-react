import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Check, X, Filter, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, filters, setFilters, isFiltersActive, setIsFiltersActive, categories, types, resetFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">Enable Filters</label>
            <button
              onClick={() => setIsFiltersActive(!isFiltersActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${isFiltersActive ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${isFiltersActive ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Start</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.dateStart}
                onChange={(e) => setFilters({ ...filters, dateStart: e.target.value })}
                disabled={!isFiltersActive}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date End</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.dateEnd}
                onChange={(e) => setFilters({ ...filters, dateEnd: e.target.value })}
                disabled={!isFiltersActive}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.categorie}
                onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
                disabled={!isFiltersActive}
              >
                <option value="">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                disabled={!isFiltersActive}
              >
                <option value="">All</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={resetFilters}
              className="flex-1 py-2 px-4 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
              disabled={!isFiltersActive}
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionTable = ({ transactions, onUpdateTransaction, onDeleteTransaction }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [filters, setFilters] = useState({
    dateStart: '',
    dateEnd: '',
    categorie: '',
    type: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({
    type: '',
    categorie: '',
    isCustomCategory: false
  });
  const [isExpanded, setIsExpanded] = useState(false);
    const categories = [...new Set(transactions.map(t => t.categorie))];
  const types = [...new Set(transactions.map(t => t.type))];

  const hasActiveFilters = isFiltersActive && (
    filters.dateStart ||
    filters.dateEnd ||
    filters.categorie ||
    filters.type
  );

  // Style dynamique pour la hauteur du tableau
  const tableContainerStyle = {
    maxHeight: isExpanded ? 'none' : '400px',
    transition: 'max-height 0.3s ease-in-out'
  };

  useEffect(() => {
    if (isFiltersActive) {
      applyFilters();
    } else {
      setFilteredTransactions(transactions);
    }
  }, [filters, transactions, isFiltersActive]);

  const applyFilters = () => {
    let filtered = [...transactions];

    if (filters.dateStart) {
      filtered = filtered.filter(t => t.date >= filters.dateStart);
    }
    if (filters.dateEnd) {
      filtered = filtered.filter(t => t.date <= filters.dateEnd);
    }
    if (filters.categorie) {
      filtered = filtered.filter(t => t.categorie === filters.categorie);
    }
    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    setFilteredTransactions(filtered);
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditedValues({
      type: transaction.type,
      categorie: transaction.categorie,
      isCustomCategory: false
    });
  };

  const handleSave = async (transaction) => {
    try {
      const updatedTransaction = {
        ...transaction,
        type: editedValues.type,
        categorie: editedValues.categorie.trim()
      };

      const success = await onUpdateTransaction(updatedTransaction);

      if (success) {
        setEditingId(null);
        setEditedValues({
          type: '',
          categorie: '',
          isCustomCategory: false
        });
      }
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValues({
      type: '',
      categorie: '',
      isCustomCategory: false
    });
  };

  const handleDelete = async (id) => {
    try {
      const success = await onDeleteTransaction(id);
      if (!success) {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const resetFilters = () => {
    setFilters({
      dateStart: '',
      dateEnd: '',
      categorie: '',
      type: '',
    });
    setIsFiltersActive(false);
  };

  return (
    <div className="w-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">Transactions Details</h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              {isExpanded ? (
                <><ChevronUp className="h-4 w-4 mr-1" /> Show Less</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-1" /> Show More</>
              )}
            </button>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className={`h-4 w-4 mr-2 ${hasActiveFilters ? 'text-blue-500' : 'text-gray-500'}`} />
            {hasActiveFilters ? 'Filters Active' : 'Filters'}
          </button>
        </div>
      </div>
            <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        isFiltersActive={isFiltersActive}
        setIsFiltersActive={setIsFiltersActive}
        categories={categories}
        types={types}
        resetFilters={resetFilters}
      />

      <div className="overflow-x-auto">
        <div className="overflow-y-auto" style={tableContainerStyle}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit/Credit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.libelle}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.montant >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {transaction.montant.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingId === transaction.id ? (
                      <select
                        className="rounded border border-gray-300 px-2 py-1"
                        value={editedValues.type}
                        onChange={(e) => setEditedValues({
                          ...editedValues,
                          type: e.target.value
                        })}
                      >
                        {types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {transaction.type}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingId === transaction.id ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditedValues({
                            ...editedValues,
                            isCustomCategory: !editedValues.isCustomCategory
                          })}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          {editedValues.isCustomCategory ? 'Select existing' : 'Add new'}
                        </button>

                        {editedValues.isCustomCategory ? (
                          <input
                            type="text"
                            className="rounded border border-gray-300 px-2 py-1 text-sm w-32"
                            value={editedValues.categorie}
                            onChange={(e) => setEditedValues({
                              ...editedValues,
                              categorie: e.target.value
                            })}
                            placeholder="New category..."
                          />
                        ) : (
                          <select
                            className="rounded border border-gray-300 px-2 py-1"
                            value={editedValues.categorie}
                            onChange={(e) => setEditedValues({
                              ...editedValues,
                              categorie: e.target.value
                            })}
                          >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {transaction.categorie}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.montant >= 0 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {transaction.montant >= 0 ? 'Credit' : 'Debit'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      {editingId === transaction.id ? (
                        <>
                          <button
                            onClick={() => handleSave(transaction)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(transaction)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;