import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@/data/mockTransactions";
import { Button } from "@/components/ui/button";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTransactions } from "@/hooks/use-transactions";
import { useTransactionFilters } from "@/hooks/use-transaction-filters";

const TransactionTable = () => {
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();
  const { filters } = useTransactionFilters();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { toast } = useToast();

  // Filtrer les transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesCategorie = filters.categorie === "Tous" || transaction.categorie === filters.categorie;
    const matchesType = filters.type === "Tous" || transaction.type === filters.type;
    const matchesMinMontant = !filters.montantMin || transaction.montant >= parseFloat(filters.montantMin);
    const matchesMaxMontant = !filters.montantMax || transaction.montant <= parseFloat(filters.montantMax);
    
    let matchesDateRange = true;
    if (filters.date) {
      const transactionDate = new Date(transaction.date);
      const filterDate = new Date(filters.date);
      matchesDateRange = transactionDate.toDateString() === filterDate.toDateString();
    }
    
    return matchesCategorie && matchesType && matchesMinMontant && matchesMaxMontant && matchesDateRange;
  });

  const handleSaveEdit = async () => {
    if (editingTransaction) {
      const success = await updateTransaction(editingTransaction);
      if (success) {
        setEditingTransaction(null);
        toast({
          title: "Transaction mise à jour",
          description: "La transaction a été modifiée avec succès.",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la mise à jour.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteTransaction(id);
    if (success) {
      toast({
        title: "Transaction supprimée",
        description: "La transaction a été supprimée avec succès.",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Libellé</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{transaction.libelle}</TableCell>
              <TableCell className={transaction.montant < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                {transaction.montant.toFixed(2)} €
              </TableCell>
              <TableCell>{transaction.categorie}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditingTransaction(transaction)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600 dark:text-red-400"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la transaction</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={editingTransaction.date}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      date: e.target.value,
                    })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Libellé</label>
                <Input
                  value={editingTransaction.libelle}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      libelle: e.target.value,
                    })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Montant</label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingTransaction.montant}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      montant: parseFloat(e.target.value),
                    })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Catégorie</label>
                <select
                  className="w-full p-2 border rounded-md dark:bg-gray-800"
                  value={editingTransaction.categorie}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      categorie: e.target.value,
                    })}
                >
                  {['Alimentation', 'Transport', 'Loisirs', 'Logement', 'Santé', 'Shopping', 'Autres'].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  className="w-full p-2 border rounded-md dark:bg-gray-800"
                  value={editingTransaction.type}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      type: e.target.value,
                    })}
                >
                  {['CB', 'Espèces', 'Virement', 'Prélèvement'].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleSaveEdit} className="w-full">
                Sauvegarder
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionTable;