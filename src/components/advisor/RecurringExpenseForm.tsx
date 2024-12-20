import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RecurringExpense {
  description: string;
  amount: number;
  frequency: string;
}

const RecurringExpenseForm = () => {
  const [expenses, setExpenses] = useState<RecurringExpense[]>([]);
  const [newExpense, setNewExpense] = useState<RecurringExpense>({
    description: "",
    amount: 0,
    frequency: "mensuel"
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount > 0) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ description: "", amount: 0, frequency: "mensuel" });
      toast({
        title: "Dépense récurrente ajoutée",
        description: `${newExpense.description}: ${newExpense.amount}€ ${newExpense.frequency}`
      });
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Ajouter une dépense récurrente</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Montant"
            value={newExpense.amount || ""}
            onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
            className="w-32"
          />
          <select
            value={newExpense.frequency}
            onChange={(e) => setNewExpense({ ...newExpense, frequency: e.target.value })}
            className="border rounded px-2"
          >
            <option value="mensuel">Mensuel</option>
            <option value="annuel">Annuel</option>
          </select>
          <Button type="submit">Ajouter</Button>
        </div>
      </form>

      <div className="mt-4 space-y-2">
        {expenses.map((expense, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-secondary rounded">
            <span>{expense.description}</span>
            <span>{expense.amount}€ ({expense.frequency})</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecurringExpenseForm;