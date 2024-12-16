import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Select } from "../ui/select";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Dashboard({ transactions }) {
  const [period, setPeriod] = useState("daily");
  const [viewMode, setViewMode] = useState("chart");

  const formatData = (transactions) => {
    return transactions.map(transaction => ({
      date: format(new Date(transaction.date), 'dd/MM/yyyy'),
      debit: transaction.type === 'debit' ? transaction.amount : 0,
      credit: transaction.type === 'credit' ? transaction.amount : 0,
    }));
  };

  const data = formatData(transactions);

  const totalBalance = transactions.reduce(
    (acc, curr) =>
      curr.type === "credit"
        ? acc + curr.amount
        : acc - curr.amount,
    0
  );

  const avgMonthlyIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((acc, curr) => acc + curr.amount, 0) / 12;

  const avgMonthlyExpenses = transactions
    .filter((t) => t.type === "debit")
    .reduce((acc, curr) => acc + curr.amount, 0) / 12;

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm text-gray-400 mb-1">Total Balance</h3>
          <p className="text-2xl font-bold">{totalBalance.toFixed(2)} €</p>
          <span className="text-green-500 text-sm">↗ 100.2%</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-400 mb-1">Avg Monthly Income</h3>
          <p className="text-2xl font-bold">{avgMonthlyIncome.toFixed(2)} €</p>
          <span className="text-green-500 text-sm">↗ 100.0%</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-400 mb-1">Avg Monthly Expenses</h3>
          <p className="text-2xl font-bold">{avgMonthlyExpenses.toFixed(2)} €</p>
          <span className="text-red-500 text-sm">↘ 99.7%</span>
        </Card>
      </div>

      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Évolution des transactions</h2>
          <div className="flex gap-2">
            <Select
              value={period}
              onValueChange={setPeriod}
              className="w-32"
            >
              <option value="daily">Journalier</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>
            </Select>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "chart" ? "secondary" : "ghost"}
                onClick={() => setViewMode("chart")}
                className="px-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                onClick={() => setViewMode("table")}
                className="px-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "chart" ? (
          <div className="relative h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis 
                  dataKey="date" 
                  stroke="#718096"
                  tick={{ fill: '#718096' }}
                />
                <YAxis 
                  stroke="#718096"
                  tick={{ fill: '#718096' }}
                  tickFormatter={(value) => `${value} €`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a202c',
                    border: '1px solid #2d3748',
                    borderRadius: '0.375rem'
                  }}
                  labelStyle={{ color: '#718096' }}
                  labelFormatter={(label) => `Date: ${label}`}
                  formatter={(value) => [`${value} €`]}
                />
                <Legend />
                <Bar dataKey="debit" name="Débit" fill="#f56565" />
                <Bar dataKey="credit" name="Crédit" fill="#48bb78" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Débit</th>
                  <th className="px-6 py-3">Crédit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4 text-red-500">
                      {item.debit > 0 ? `${item.debit} €` : '-'}
                    </td>
                    <td className="px-6 py-4 text-green-500">
                      {item.credit > 0 ? `${item.credit} €` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}