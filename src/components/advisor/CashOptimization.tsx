import { Card } from "@/components/ui/card";
import { Transaction } from "@/data/mockTransactions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { 
  findRecurringExpenses,
  findUnusualExpenses,
  calculateSavingsPotential
} from "@/lib/financialCalculations";
import RecurringExpenseForm from "./RecurringExpenseForm";

interface CashOptimizationProps {
  transactions: Transaction[];
}

const CashOptimization = ({ transactions }: CashOptimizationProps) => {
  const recurringExpenses = findRecurringExpenses(transactions);
  const unusualExpenses = findUnusualExpenses(transactions);
  const savingsPotential = calculateSavingsPotential(transactions);

  return (
    <div className="space-y-6">
      <RecurringExpenseForm />

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Dépenses récurrentes détectées</h3>
        <div className="space-y-2">
          {recurringExpenses.map((expense, index) => (
            <div key={index} className="flex justify-between">
              <span>{expense.description}</span>
              <span>{expense.amount.toFixed(2)}€/mois</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Dépenses inhabituelles</h3>
        <div className="space-y-2">
          {unusualExpenses.map((expense, index) => (
            <Alert key={index} className="mb-2">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>{expense.description}</AlertTitle>
              <AlertDescription>
                Dépense de {expense.amount.toFixed(2)}€ le {new Date(expense.date).toLocaleDateString('fr-FR')}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Potentiel d'optimisation</h3>
        <div className="space-y-2">
          {savingsPotential.suggestions.map((suggestion, index) => (
            <Alert key={index} className="mb-2">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Économie potentielle : {suggestion.amount.toFixed(2)}€</AlertTitle>
              <AlertDescription>{suggestion.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CashOptimization;