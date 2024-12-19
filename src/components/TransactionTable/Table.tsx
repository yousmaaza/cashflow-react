import React from 'react';
import { SelectField } from '../Select/SelectField';

export const Table = ({ transactions, onUpdateTransaction }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-opacity-5">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Montant</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Catégorie</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-transparent dark:divide-gray-700">
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{transaction.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{transaction.description}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                {transaction.amount.toFixed(2)} €
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <SelectField
                  value={transaction.type}
                  onChange={(value) => onUpdateTransaction(transaction.id, { type: value })}
                  options={[
                    { value: 'virement', label: 'Virement' },
                    { value: 'cheque', label: 'Chèque' },
                    { value: 'prelevement', label: 'Prélèvement' },
                    { value: 'paiement_carte', label: 'Paiement carte' }
                  ]}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <SelectField
                  value={transaction.category}
                  onChange={(value) => onUpdateTransaction(transaction.id, { category: value })}
                  options={[
                    { value: 'epargne', label: 'Épargne' },
                    { value: 'frais_bancaires', label: 'Frais bancaires' },
                    { value: 'revenus', label: 'Revenus' }
                  ]}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
