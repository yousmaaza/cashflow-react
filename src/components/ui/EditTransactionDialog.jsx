import React, { useState } from 'react';

const EditTransactionDialog = ({ isOpen, onClose, onSave, transaction }) => {
  const [formData, setFormData] = useState({
    type: transaction?.type || '',
    categorie: transaction?.categorie || '',
    isNewCategory: false,
    newCategory: ''
  });

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...transaction,
      type: formData.type,
      categorie: formData.isNewCategory ? formData.newCategory : formData.categorie
    });
  };

  const handleChange = (field, value) => {
    if (field === 'categorie' && value === '_new_') {
      setFormData(prev => ({
        ...prev,
        isNewCategory: true,
        categorie: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        isNewCategory: field === 'isNewCategory' ? value : prev.isNewCategory
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modifier la transaction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Sélectionner un type</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <div className="space-y-2">
              <select
                value={formData.isNewCategory ? '_new_' : formData.categorie}
                onChange={(e) => handleChange('categorie', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
                <option value="_new_">+ Nouvelle catégorie</option>
              </select>

              {formData.isNewCategory && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={formData.newCategory}
                    onChange={(e) => handleChange('newCategory', e.target.value)}
                    placeholder="Nom de la nouvelle catégorie"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={formData.isNewCategory && !formData.newCategory.trim()}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionDialog;