import { Transaction } from "@/data/mockTransactions";

export const calculateMonthlyIncome = (transactions: Transaction[]): number => {
  const incomeTransactions = transactions.filter(t => t.amount > 0);
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const monthsCount = getMonthsCount(transactions);
  return totalIncome / monthsCount;
};

export const calculateMonthlyExpenses = (transactions: Transaction[]): number => {
  const expenseTransactions = transactions.filter(t => t.amount < 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const monthsCount = getMonthsCount(transactions);
  return totalExpenses / monthsCount;
};

export const calculateCategoryExpenses = (transactions: Transaction[]): Record<string, number> => {
  return transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);
};

export const getRecommendedThresholds = (transactions: Transaction[]): Record<string, number> => {
  const monthlyIncome = calculateMonthlyIncome(transactions);
  
  // Seuils recommandés en pourcentage du revenu mensuel
  const thresholds = {
    'Logement': 0.33,
    'Alimentation': 0.15,
    'Transport': 0.15,
    'Loisirs': 0.10,
    'Santé': 0.10,
    'Shopping': 0.10,
    'Autres': 0.07
  };

  return Object.entries(thresholds).reduce((acc, [category, percentage]) => {
    acc[category] = monthlyIncome * percentage;
    return acc;
  }, {} as Record<string, number>);
};

export const findRecurringExpenses = (transactions: Transaction[]) => {
  // Groupe les transactions par description et montant similaire
  const grouped = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
      const key = `${t.description}_${Math.round(t.amount)}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(t);
      return acc;
    }, {} as Record<string, Transaction[]>);

  // Identifie les dépenses qui apparaissent régulièrement
  return Object.values(grouped)
    .filter(group => group.length >= 2)
    .map(group => ({
      description: group[0].description,
      amount: Math.abs(group[0].amount),
      frequency: group.length
    }));
};

export const findUnusualExpenses = (transactions: Transaction[]) => {
  const monthlyAverage = calculateMonthlyExpenses(transactions);
  
  return transactions
    .filter(t => t.amount < 0 && Math.abs(t.amount) > monthlyAverage * 0.5)
    .map(t => ({
      description: t.description,
      amount: Math.abs(t.amount),
      date: t.date
    }));
};

export const calculateSavingsPotential = (transactions: Transaction[]) => {
  const categoryExpenses = calculateCategoryExpenses(transactions);
  const recommendedThresholds = getRecommendedThresholds(transactions);
  const suggestions = [];

  for (const [category, amount] of Object.entries(categoryExpenses)) {
    const threshold = recommendedThresholds[category];
    if (amount > threshold) {
      suggestions.push({
        category,
        amount: amount - threshold,
        description: `Réduire les dépenses de ${category} pour économiser jusqu'à ${(amount - threshold).toFixed(2)}€`
      });
    }
  }

  return { suggestions };
};

const getMonthsCount = (transactions: Transaction[]): number => {
  if (transactions.length === 0) return 1;
  
  const dates = transactions.map(t => new Date(t.date));
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
  
  return (
    (maxDate.getFullYear() - minDate.getFullYear()) * 12 +
    (maxDate.getMonth() - minDate.getMonth()) + 1
  );
};