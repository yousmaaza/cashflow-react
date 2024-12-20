import { create } from 'zustand';

type TransactionFilters = {
  date: Date | undefined;
  categorie: string;
  type: string;
  montantMin: string;
  montantMax: string;
};

type TransactionFiltersStore = {
  filters: TransactionFilters;
  setDate: (date: Date | undefined) => void;
  setCategorie: (categorie: string) => void;
  setType: (type: string) => void;
  setMontantMin: (montant: string) => void;
  setMontantMax: (montant: string) => void;
  resetFilters: () => void;
};

const initialFilters: TransactionFilters = {
  date: undefined,
  categorie: "Tous",
  type: "Tous",
  montantMin: "",
  montantMax: "",
};

export const useTransactionFilters = create<TransactionFiltersStore>((set) => ({
  filters: initialFilters,
  setDate: (date) => set((state) => ({ 
    filters: { ...state.filters, date } 
  })),
  setCategorie: (categorie) => set((state) => ({ 
    filters: { ...state.filters, categorie } 
  })),
  setType: (type) => set((state) => ({ 
    filters: { ...state.filters, type } 
  })),
  setMontantMin: (montantMin) => set((state) => ({ 
    filters: { ...state.filters, montantMin } 
  })),
  setMontantMax: (montantMax) => set((state) => ({ 
    filters: { ...state.filters, montantMax } 
  })),
  resetFilters: () => set({ filters: initialFilters }),
}));