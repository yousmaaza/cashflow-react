import { create } from 'zustand';

type TransactionFilters = {
  date: Date | undefined;
  category: string;
  type: string;
  minAmount: string;
  maxAmount: string;
};

type TransactionFiltersStore = {
  filters: TransactionFilters;
  setDate: (date: Date | undefined) => void;
  setCategory: (category: string) => void;
  setType: (type: string) => void;
  setMinAmount: (amount: string) => void;
  setMaxAmount: (amount: string) => void;
  resetFilters: () => void;
};

const initialFilters: TransactionFilters = {
  date: undefined,
  category: "Tous",
  type: "Tous",
  minAmount: "",
  maxAmount: "",
};

export const useTransactionFilters = create<TransactionFiltersStore>((set) => ({
  filters: initialFilters,
  setDate: (date) => set((state) => ({ filters: { ...state.filters, date } })),
  setCategory: (category) => set((state) => ({ filters: { ...state.filters, category } })),
  setType: (type) => set((state) => ({ filters: { ...state.filters, type } })),
  setMinAmount: (minAmount) => set((state) => ({ filters: { ...state.filters, minAmount } })),
  setMaxAmount: (maxAmount) => set((state) => ({ filters: { ...state.filters, maxAmount } })),
  resetFilters: () => set({ filters: initialFilters }),
}));