import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SavingsAccount {
  type: string;
  amount: number;
}

const SavingsAccounts = () => {
  const [accounts, setAccounts] = useState<SavingsAccount[]>([
    { type: "Livret A", amount: 0 },
    { type: "PEL", amount: 0 },
    { type: "PEA", amount: 0 }
  ]);
  const { toast } = useToast();

  const handleAmountChange = (index: number, amount: string) => {
    const newAccounts = [...accounts];
    newAccounts[index].amount = parseFloat(amount) || 0;
    setAccounts(newAccounts);
    
    toast({
      title: "Montant mis à jour",
      description: `${accounts[index].type}: ${amount}€`
    });
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Comptes d'épargne</h3>
      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-24">{account.type}</span>
            <Input
              type="number"
              value={account.amount}
              onChange={(e) => handleAmountChange(index, e.target.value)}
              className="w-40"
              placeholder="Montant"
            />
            <span>€</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SavingsAccounts;