import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';

export const useTransactionAggregation = (transactions, period = 'daily') => {
  return useMemo(() => {
    if (!transactions?.length) return [];

    // Fonction pour obtenir la clé de groupe selon la période
    const getGroupKey = (date) => {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      
      switch (period) {
        case 'daily':
          return format(parsedDate, 'yyyy-MM-dd');
        case 'monthly':
          return format(parsedDate, 'yyyy-MM');
        case 'quarterly':
          const quarter = Math.floor(parsedDate.getMonth() / 3) + 1;
          return `${format(parsedDate, 'yyyy')} Q${quarter}`;
        case 'biannual':
          const semester = parsedDate.getMonth() < 6 ? 'H1' : 'H2';
          return `${format(parsedDate, 'yyyy')} ${semester}`;
        default:
          return format(parsedDate, 'yyyy-MM-dd');
      }
    };

    // Agréger les transactions
    const aggregatedData = transactions.reduce((acc, transaction) => {
      const key = getGroupKey(transaction.date);
      
      if (!acc[key]) {
        acc[key] = {
          date: key,
          credit: 0,
          debit: 0
        };
      }

      const amount = parseFloat(transaction.montant);
      if (amount > 0) {
        acc[key].credit += amount;
      } else {
        acc[key].debit += Math.abs(amount);
      }

      return acc;
    }, {});

    // Convertir l'objet en tableau et trier par date
    return Object.values(aggregatedData).sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions, period]);
};