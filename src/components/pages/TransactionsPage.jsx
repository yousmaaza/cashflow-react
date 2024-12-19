// ... imports restent les mêmes

const TableHeader = () => (
  <thead>
    <tr className="border-b border-gray-200 text-gray-700">
      <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium">Date</th>
      <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium">Description</th>
      <th className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">Montant</th>
      <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium">Catégorie</th>
      <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium">Type</th>
      <th className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">Actions</th>
    </tr>
  </thead>
);

const TransactionsTable = ({ transactions, onDelete, renderEditableCell }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm">{formatDate(transaction.date)}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">{transaction.libelle}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-right">
                {formatAmount(transaction.montant)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {renderEditableCell(transaction, 'categorie', transaction.categorie, categories)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {renderEditableCell(transaction, 'type', transaction.type, types)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-150"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Dans le composant principal TransactionsPage, remplacer la section du tableau par :
{isLoading ? (
  <div className="flex justify-center items-center h-48">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
  </div>
) : sortedTransactions.length > 0 ? (
  <TransactionsTable
    transactions={sortedTransactions}
    onDelete={handleDelete}
    renderEditableCell={renderEditableCell}
  />
) : (
  <div className="text-center py-12 text-gray-500">
    Aucune transaction disponible
  </div>
)}

// ... reste du composant reste inchangé
