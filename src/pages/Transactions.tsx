import TransactionTable from "@/components/transactions/TransactionTable";
import PDFUploader from "@/components/transactions/PDFUploader";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { FilterPopover } from "@/components/transactions/FilterPopover";
import { useTransactions } from "@/hooks/use-transactions";
import { useTransactionFilters } from "@/hooks/use-transaction-filters";

const Transactions = () => {
  const { transactions } = useTransactions();
  const { filters, resetFilters } = useTransactionFilters();

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

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Transactions
          </h1>
          <div className="flex gap-2">
            <PDFUploader />
            <FilterPopover onResetFilters={resetFilters} />
          </div>
        </div>

        <div className="mt-6">
          <TransactionTable />
        </div>
      </main>
    </div>
  );
};

export default Transactions;