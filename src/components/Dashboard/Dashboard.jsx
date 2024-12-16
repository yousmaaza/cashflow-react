import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaTable, FaChartBar } from 'react-icons/fa';

const Dashboard = ({ transactions }) => {
  const [viewType, setViewType] = useState('chart');
  const [period, setPeriod] = useState('daily');

  const formatTransactionsForChart = () => {
    // Logique de formatage existante
    return transactions.map(t => ({
      date: new Date(t.date).toLocaleDateString('fr-FR'),
      debit: t.type === 'debit' ? t.amount : 0,
      credit: t.type === 'credit' ? t.amount : 0
    }));
  };

  return (
    <div className="p-4">
      <div className="grid gap-4 mb-4">
        {/* ... Autres éléments du dashboard ... */}
        
        <div className="p-4 rounded-lg bg-secondary">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Évolution des transactions</h2>
            <div className="flex space-x-2">
              <select 
                className="bg-primary text-white p-2 rounded"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="daily">Journalier</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuel</option>
              </select>
              <button 
                className={`p-2 rounded ${viewType === 'chart' ? 'bg-blue-500' : 'bg-primary'}`}
                onClick={() => setViewType('chart')}
              >
                <FaChartBar />
              </button>
              <button 
                className={`p-2 rounded ${viewType === 'table' ? 'bg-blue-500' : 'bg-primary'}`}
                onClick={() => setViewType('table')}
              >
                <FaTable />
              </button>
            </div>
          </div>

          {viewType === 'chart' ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={formatTransactionsForChart()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '4px'
                  }}
                />
                <Legend />
                <Bar dataKey="debit" name="Débit" fill="#EF4444" />
                <Bar dataKey="credit" name="Crédit" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            // Table view code...
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;