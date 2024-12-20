import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransactionFilters } from "@/hooks/use-transaction-filters";

export interface TransactionFiltersProps {
  onResetFilters: () => void;
}

const categories = [
  { value: "Tous", label: "Toutes les catégories" },
  { value: "Alimentation", label: "Alimentation" },
  { value: "Transport", label: "Transport" },
  { value: "Loisirs", label: "Loisirs" },
  { value: "Logement", label: "Logement" },
  { value: "Santé", label: "Santé" },
  { value: "Shopping", label: "Shopping" },
  { value: "Autres", label: "Autres" }
];

const paymentTypes = [
  { value: "Tous", label: "Tous les types" },
  { value: "CB", label: "Carte bancaire" },
  { value: "Espèces", label: "Espèces" },
  { value: "Virement", label: "Virement" },
  { value: "Prélèvement", label: "Prélèvement" }
];

const TransactionFilters = ({ onResetFilters }: TransactionFiltersProps) => {
  const {
    filters,
    setDate,
    setCategorie,
    setType,
    setMontantMin,
    setMontantMax,
  } = useTransactionFilters();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <DatePicker 
            date={filters.date} 
            setDate={setDate} 
          />
        </div>

        <div className="space-y-2">
          <Label>Catégorie</Label>
          <Select value={filters.categorie} onValueChange={setCategorie}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Type de paiement</Label>
          <Select value={filters.type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {paymentTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Montant minimum</Label>
          <Input
            type="number"
            value={filters.montantMin}
            onChange={(e) => setMontantMin(e.target.value)}
            placeholder="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label>Montant maximum</Label>
          <Input
            type="number"
            value={filters.montantMax}
            onChange={(e) => setMontantMax(e.target.value)}
            placeholder="999999"
            step="0.01"
          />
        </div>

        <Button onClick={onResetFilters} variant="outline" className="w-full">
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilters;