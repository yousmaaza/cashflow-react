import { Card } from "@/components/ui/card";
import { Transaction } from "@/data/mockTransactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavingsStrategy from "./SavingsStrategy";
import CategoryManagement from "./CategoryManagement";
import CashOptimization from "./CashOptimization";

interface FinancialAdvisorProps {
  transactions: Transaction[];
}

const FinancialAdvisor = ({ transactions }: FinancialAdvisorProps) => {
  return (
    <Card className="p-6 bg-card shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent">
        Analyse Financière
      </h2>
      <Tabs defaultValue="savings" className="w-full">
        <TabsList className="mb-4 w-full justify-center">
          <TabsTrigger value="savings" className="flex-1">Stratégie d'épargne</TabsTrigger>
          <TabsTrigger value="categories" className="flex-1">Gestion des catégories</TabsTrigger>
          <TabsTrigger value="optimization" className="flex-1">Optimisation du cash</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="savings" className="space-y-4">
            <SavingsStrategy transactions={transactions} />
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <CategoryManagement transactions={transactions} />
          </TabsContent>
          <TabsContent value="optimization" className="space-y-4">
            <CashOptimization transactions={transactions} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default FinancialAdvisor;