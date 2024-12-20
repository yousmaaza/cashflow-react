export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: 'Alimentation' | 'Transport' | 'Loisirs' | 'Logement' | 'Santé' | 'Shopping' | 'Autres';
  type: 'CB' | 'Espèces' | 'Virement' | 'Prélèvement';
};

export const mockTransactions: Transaction[] = [
  // Janvier 2024
  {
    id: '1',
    date: '2024-01-01',
    description: 'Loyer Janvier',
    amount: -800.00,
    category: 'Logement',
    type: 'Prélèvement'
  },
  {
    id: '2',
    date: '2024-01-05',
    description: 'Courses Carrefour',
    amount: -95.45,
    category: 'Alimentation',
    type: 'CB'
  },
  {
    id: '3',
    date: '2024-01-10',
    description: 'Salaire',
    amount: 2300.00,
    category: 'Autres',
    type: 'Virement'
  },
  {
    id: '4',
    date: '2024-01-15',
    description: 'SNCF',
    amount: -55.00,
    category: 'Transport',
    type: 'CB'
  },
  // Février 2024
  {
    id: '5',
    date: '2024-02-01',
    description: 'Loyer Février',
    amount: -800.00,
    category: 'Logement',
    type: 'Prélèvement'
  },
  {
    id: '6',
    date: '2024-02-05',
    description: 'Courses Leclerc',
    amount: -82.45,
    category: 'Alimentation',
    type: 'CB'
  },
  {
    id: '7',
    date: '2024-02-10',
    description: 'Salaire',
    amount: 2300.00,
    category: 'Autres',
    type: 'Virement'
  },
  {
    id: '8',
    date: '2024-02-15',
    description: 'Pharmacie',
    amount: -45.50,
    category: 'Santé',
    type: 'CB'
  },
  // Mars 2024
  {
    id: '9',
    date: '2024-03-01',
    description: 'Loyer Mars',
    amount: -800.00,
    category: 'Logement',
    type: 'Prélèvement'
  },
  {
    id: '10',
    date: '2024-03-05',
    description: 'Courses Auchan',
    amount: -120.30,
    category: 'Alimentation',
    type: 'CB'
  },
  {
    id: '11',
    date: '2024-03-10',
    description: 'Salaire',
    amount: 2300.00,
    category: 'Autres',
    type: 'Virement'
  },
  {
    id: '12',
    date: '2024-03-15',
    description: 'Cinema',
    amount: -25.00,
    category: 'Loisirs',
    type: 'CB'
  },
  // Avril 2024
  {
    id: '13',
    date: '2024-04-01',
    description: 'Loyer Avril',
    amount: -800.00,
    category: 'Logement',
    type: 'Prélèvement'
  },
  {
    id: '14',
    date: '2024-04-05',
    description: 'Courses Carrefour',
    amount: -95.45,
    category: 'Alimentation',
    type: 'CB'
  },
  {
    id: '15',
    date: '2024-04-10',
    description: 'Salaire',
    amount: 2300.00,
    category: 'Autres',
    type: 'Virement'
  },
  {
    id: '16',
    date: '2024-04-15',
    description: 'Shopping',
    amount: -150.00,
    category: 'Shopping',
    type: 'CB'
  },
  // Mai 2024
  {
    id: '17',
    date: '2024-05-01',
    description: 'Loyer Mai',
    amount: -800.00,
    category: 'Logement',
    type: 'Prélèvement'
  },
  {
    id: '18',
    date: '2024-05-05',
    description: 'Courses Leclerc',
    amount: -110.45,
    category: 'Alimentation',
    type: 'CB'
  },
  {
    id: '19',
    date: '2024-05-10',
    description: 'Salaire',
    amount: 2300.00,
    category: 'Autres',
    type: 'Virement'
  },
  {
    id: '20',
    date: '2024-05-15',
    description: 'Restaurant',
    amount: -65.00,
    category: 'Alimentation',
    type: 'CB'
  }
];