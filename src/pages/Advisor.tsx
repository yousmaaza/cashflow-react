import { mockTransactions } from "@/data/mockTransactions";
import FinancialAdvisor from "@/components/advisor/FinancialAdvisor";
import AIChat from "@/components/advisor/AIChat";

const Advisor = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <FinancialAdvisor transactions={mockTransactions} />
          </div>
        </div>
      </main>
      <AIChat />
    </div>
  );
};

export default Advisor;