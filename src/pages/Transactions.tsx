import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Upload } from 'lucide-react';
import { TransactionFilters } from '@/components/TransactionFilters';

interface Transaction {
  date: string;
  description: string;
  montant: string;
  categorie: string;
  type: string;
}

export default function Transactions() {
  const transactions: Transaction[] = [
    {
      date: '01/02/2024',
      description: 'Courses Carrefour',
      montant: '-82.45 €',
      categorie: 'Alimentation',
      type: 'CB',
    },
    {
      date: '02/02/2024',
      description: 'SNCF',
      montant: '-47.00 €',
      categorie: 'Transport',
      type: 'CB',
    },
    // ... autres transactions
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Importer CSV
        </Button>
      </div>

      <TransactionFilters className="mb-6" />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className={`text-right ${
                  transaction.montant.startsWith('-') ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.montant}
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-sm bg-gray-100">
                    {transaction.categorie}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {transaction.type}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}