export interface Transaction {
  id: string;
  date: string;
  libelle: string;  // Changé de description
  montant: number;  // Changé de amount
  category: string;
  type: string;
}

// Mettre à jour les données mockées si nécessaire
export const mockTransactions: Transaction[] = [];