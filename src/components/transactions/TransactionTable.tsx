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

const TransactionTable = () => {
  const { transactions, categories, paymentTypes, loading, error, updateTransaction, deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

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
          description: "Une erreur est survenue lors de la mise à jour de la transaction.",
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
        description: "Une erreur est survenue lors de la suppression de la transaction.",
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={transaction.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                {transaction.amount.toFixed(2)} €
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
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
                  value={editingTransaction.description}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      description: e.target.value,
                    })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Montant</label>
                <Input
                  type="number"
                  value={editingTransaction.amount}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      amount: parseFloat(e.target.value),
                    })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Catégorie</label>
                <select
                  className="w-full p-2 border rounded-md dark:bg-gray-800"
                  value={editingTransaction.category}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      category: e.target.value as Transaction['category'],
                    })}
                >
                  {categories.filter(cat => cat !== "Tous").map((category) => (
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
                      type: e.target.value as Transaction['type'],
                    })}
                >
                  {paymentTypes.filter(type => type !== "Tous").map((type) => (
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