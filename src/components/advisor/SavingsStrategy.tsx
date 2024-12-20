import { Card } from "@/components/ui/card";
import { Transaction } from "@/data/mockTransactions";
import { calculateMonthlyIncome, calculateMonthlyExpenses } from "@/lib/financialCalculations";
import SavingsAccounts from "./SavingsAccounts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface SavingsStrategyProps {
  transactions: Transaction[];
}

const SavingsStrategy = ({ transactions }: SavingsStrategyProps) => {
  const monthlyIncome = calculateMonthlyIncome(transactions);
  const monthlyExpenses = calculateMonthlyExpenses(transactions);
  const potentialSavings = monthlyIncome - monthlyExpenses;
  const savingsRate = (potentialSavings / monthlyIncome) * 100;

  return (
    <div className="space-y-6">
      <SavingsAccounts />

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Analyse de votre capacité d'épargne</h3>
        <div className="space-y-2">
          <p>Revenus mensuels moyens : {monthlyIncome.toFixed(2)}€</p>
          <p>Dépenses mensuelles moyennes : {monthlyExpenses.toFixed(2)}€</p>
          <p>Capacité d'épargne potentielle : {potentialSavings.toFixed(2)}€</p>
          <p>Taux d'épargne actuel : {savingsRate.toFixed(1)}%</p>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Recommandations</h3>
        <div className="space-y-2">
          {savingsRate < 20 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Augmentez votre taux d'épargne</AlertTitle>
              <AlertDescription>
                Nous vous recommandons d'augmenter votre taux d'épargne à au moins 20% de vos revenus.
              </AlertDescription>
            </Alert>
          )}
          {monthlyExpenses > monthlyIncome * 0.8 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Dépenses élevées</AlertTitle>
              <AlertDescription>
                Vos dépenses représentent une part importante de vos revenus. Essayez d'identifier les postes de dépenses non essentiels.
              </AlertDescription>
            </Alert>
          )}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Épargne de précaution</AlertTitle>
            <AlertDescription>
              Objectif suggéré : constituer une épargne de précaution équivalente à 3-6 mois de dépenses ({(monthlyExpenses * 3).toFixed(2)}€ - {(monthlyExpenses * 6).toFixed(2)}€)
            </AlertDescription>
          </Alert>
        </div>
      </Card>
    </div>
  );
};

export default SavingsStrategy;