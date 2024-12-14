import { useState, useMemo } from 'react';

const useFilters = (transactions) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [filters, setFilters] = useState({
    dateStart: '',
    dateEnd: '',
    categorie: '',
    type: '',
  });

  const categories = useMemo(() => 
    [...new Set(transactions.map(t => t.categorie))],
    [transactions]
  );

  const types = useMemo(() => 
    [...new Set(transactions.map(t => t.type))],
    [transactions]
  );

  const resetFilters = () => {
    setFilters({
      dateStart: '',
      dateEnd: '',
      categorie: '',
      type: '',
    });
    setIsFiltersActive(false);
  };

  const filteredTransactions = useMemo(() => {
    if (!isFiltersActive) return transactions;

    return transactions.filter(transaction => {
      if (filters.dateStart && transaction.date < filters.dateStart) return false;
      if (filters.dateEnd && transaction.date > filters.dateEnd) return false;
      if (filters.categorie && transaction.categorie !== filters.categorie) return false;
      if (filters.type && transaction.type !== filters.type) return false;
      return true;
    });
  }, [transactions, filters, isFiltersActive]);

  const hasActiveFilters = isFiltersActive && (
    filters.dateStart ||
    filters.dateEnd ||
    filters.categorie ||
    filters.type
  );

  return {
    filters,
    setFilters,
    isFiltersActive,
    setIsFiltersActive,
    isFilterModalOpen,
    setIsFilterModalOpen,
    filteredTransactions,
    categories,
    types,
    resetFilters,
    hasActiveFilters
  };
};

export default useFilters;