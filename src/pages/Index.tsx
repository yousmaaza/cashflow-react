import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { TransactionList } from "@/components/dashboard/TransactionList";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FinancialSummary />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseChart />
          <TransactionList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;