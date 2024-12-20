import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransactionFilters } from "@/hooks/use-transaction-filters";
import { getCategories, getPaymentTypes } from "@/services/api";

export interface TransactionFiltersProps {
  onResetFilters: () => void;
}

const TransactionFilters = ({ onResetFilters }: TransactionFiltersProps) => {
  const {
    filters,
    setDate,
    setCategorie,
    setType,
    setMontantMin,
    setMontantMax,
  } = useTransactionFilters();

  const [categories, setCategories] = useState<string[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    const fetchPaymentTypes = async () => {
      const paymentTypes = await getPaymentTypes();
      setPaymentTypes(paymentTypes);
    };

    fetchCategories();
    fetchPaymentTypes();
  }, []);

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
                <SelectItem key={category} value={category}>
                  {category}
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
                <SelectItem key={type} value={type}>
                  {type}
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