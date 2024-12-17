import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Composant pour le graphique en barres des transactions
export const TransactionsBarChart = ({ data }) => {
  return (
    <div className="h-96 bg-slate-800/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Évolution des transactions</h3>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#9CA3AF' }}
            tickFormatter={(date) => {
              const d = new Date(date);
              return `${d.getDate()}/${d.getMonth() + 1}`;
            }}
          />
          <YAxis 
            tick={{ fill: '#9CA3AF' }}
            tickFormatter={(value) => `${value}€`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#F3F4F6'
            }}
            formatter={(value) => [`${value}€`, undefined]}
          />
          <Legend wrapperStyle={{ color: '#F3F4F6' }} />
          <Bar dataKey="credit" name="Crédit" fill="#4CAF50" />
          <Bar dataKey="debit" name="Débit" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Composant pour les graphiques en camembert
export const TransactionsPieCharts = ({ transactions }) => {
  // Couleurs pour les graphiques en camembert
  const colors = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722', '#607D8B'];

  // Préparation des données pour le camembert des catégories de dépenses
  const categoryData = transactions
    .filter(t => parseFloat(t.montant) < 0)
    .reduce((acc, t) => {
      const category = t.categorie || 'Non catégorisé';
      const amount = Math.abs(parseFloat(t.montant));
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

  const categoryPieData = Object.entries(categoryData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Préparation des données pour le camembert des types de paiement
  const paymentTypeData = transactions.reduce((acc, t) => {
    const type = t.type_paiement || 'Non spécifié';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const paymentTypePieData = Object.entries(paymentTypeData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Composant pour un camembert individuel
  const PieChartComponent = ({ data, title }) => (
    <div className="h-80 bg-slate-800/50 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => 
              `${name} (${(percent * 100).toFixed(1)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#F3F4F6'
            }}
            formatter={(value, name) => {
              return [
                categoryPieData.includes(data[0]) ? 
                  `${value.toFixed(2)}€` : 
                  value,
                name
              ];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PieChartComponent 
        data={categoryPieData} 
        title="Répartition des dépenses" 
      />
      <PieChartComponent 
        data={paymentTypePieData} 
        title="Types de paiement" 
      />
    </div>
  );
};