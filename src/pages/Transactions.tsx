import { useState } from "react";
import { mockTransactions, Transaction } from "@/data/mockTransactions";
import TransactionTable from "@/components/transactions/TransactionTable";
import PDFUploader from "@/components/transactions/PDFUploader";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { FilterPopover } from "@/components/transactions/FilterPopover";

const defaultCategories = [
  "Alimentation",
  "Transport",
  "Loisirs",
  "Logement",
  "Santé",
  "Shopping",
  "Autres",
  "Tous"
];

const paymentTypes = ["CB", "Espèces", "Virement", "Prélèvement", "Tous"];

const Transactions = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPaymentType, setSelectedPaymentType] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleResetFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedCategory("all");
    setSelectedPaymentType("all");
    setMinAmount("");
    setMaxAmount("");
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    ));
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
    const matchesType = selectedPaymentType === "all" || transaction.type === selectedPaymentType;
    const matchesMinAmount = !minAmount || transaction.amount >= parseFloat(minAmount);
    const matchesMaxAmount = !maxAmount || transaction.amount <= parseFloat(maxAmount);
    
    let matchesDateRange = true;
    if (startDate && endDate) {
      const transactionDate = new Date(transaction.date);
      matchesDateRange = isWithinInterval(transactionDate, {
        start: startOfDay(startDate),
        end: endOfDay(endDate)
      });
    }
    
    return matchesCategory && matchesType && matchesMinAmount && matchesMaxAmount && matchesDateRange;
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
            <FilterPopover
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPaymentType={selectedPaymentType}
              setSelectedPaymentType={setSelectedPaymentType}
              minAmount={minAmount}
              setMinAmount={setMinAmount}
              maxAmount={maxAmount}
              setMaxAmount={setMaxAmount}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        <div className="mt-6">
          <TransactionTable
            transactions={filteredTransactions}
            categories={defaultCategories}
            paymentTypes={paymentTypes}
            onUpdateTransaction={handleUpdateTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </main>
    </div>
  );
};

export default Transactions;