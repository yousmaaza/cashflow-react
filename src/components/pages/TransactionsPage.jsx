// [...Tout le code précédent reste identique jusqu'à la ligne du mapping des transactions]

              <tbody>
                {transactions
                  .slice()
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((transaction) => (
                  <tr key={transaction.id}>
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

// [...Le reste du code reste identique]