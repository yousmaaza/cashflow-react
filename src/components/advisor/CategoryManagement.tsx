import { Card } from "@/components/ui/card";
import { Transaction } from "@/data/mockTransactions";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { calculateCategoryExpenses, getRecommendedThresholds } from "@/lib/financialCalculations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CategoryManagementProps {
  transactions: Transaction[];
}

const CategoryManagement = ({ transactions }: CategoryManagementProps) => {
  const categoryExpenses = calculateCategoryExpenses(transactions);
  const recommendedThresholds = getRecommendedThresholds(transactions);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSetupAlerts = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
      });
      return;
    }

    // Ici, vous pourriez implémenter l'appel API pour configurer les alertes
    console.log("Configuration des alertes pour:", email);
    toast({
      title: "Alertes configurées",
      description: `Les alertes seront envoyées à ${email}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Configuration des alertes</h3>
        <form onSubmit={handleSetupAlerts} className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="email"
              placeholder="Votre email pour les alertes"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Configurer les alertes</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4">
        {Object.entries(categoryExpenses).map(([category, amount]) => {
          const threshold = recommendedThresholds[category];
          const percentage = (amount / threshold) * 100;
          const isOverThreshold = amount > threshold;

          return (
            <Card key={category} className="p-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{category}</h3>
                <span>{amount.toFixed(2)}€ / {threshold.toFixed(2)}€</span>
              </div>
              <Progress value={Math.min(percentage, 100)} className="mb-2" />
              {isOverThreshold && (
                <Alert variant="destructive" className="mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Dépassement du seuil recommandé</AlertTitle>
                  <AlertDescription>
                    Vous avez dépassé le seuil recommandé pour la catégorie {category} de {(amount - threshold).toFixed(2)}€
                  </AlertDescription>
                </Alert>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryManagement;