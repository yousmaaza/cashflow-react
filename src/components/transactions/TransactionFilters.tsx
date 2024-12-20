import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface TransactionFiltersProps {
  startDate?: Date;
  setStartDate: (date?: Date) => void;
  endDate?: Date;
  setEndDate: (date?: Date) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPaymentType: string;
  setSelectedPaymentType: (type: string) => void;
  minAmount: string;
  setMinAmount: (amount: string) => void;
  maxAmount: string;
  setMaxAmount: (amount: string) => void;
  onResetFilters: () => void;
}

const TransactionFilters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedCategory,
  setSelectedCategory,
  selectedPaymentType,
  setSelectedPaymentType,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  onResetFilters
}: TransactionFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label>Date de début</Label>
          <DatePicker date={startDate} setDate={setStartDate} />
        </div>

        <div className="space-y-2">
          <Label>Date de fin</Label>
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>

        <div className="space-y-2">
          <Label>Catégorie</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="restaurant">Restaurant</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Type de paiement</Label>
          <Select value={selectedPaymentType} onValueChange={setSelectedPaymentType}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="card">Carte</SelectItem>
              <SelectItem value="cash">Espèces</SelectItem>
              <SelectItem value="transfer">Virement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Montant minimum</Label>
          <Input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Montant maximum</Label>
          <Input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="999999"
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