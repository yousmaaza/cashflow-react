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
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Si la date n'est pas valide, on essaie de parser le format "DD/MM"
      const parts = dateString.split('/');
      if (parts.length === 2) {
        return dateString; // On garde le format existant
      }
      return ''; // Date invalide
    }
    // Format de date français
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg">
          <p className="text-gray-300 font-semibold mb-2">{formatDate(label)}</p>
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  entry.name === 'Crédit' ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
              <span className="text-gray-300">
                {entry.name}: <span className="font-semibold">{Number(entry.value).toFixed(2)}€</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] p-6">
      <h3 className="text-lg font-semibold text-gray-200 mb-6">Évolution des transactions</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#9CA3AF' }}
            tickFormatter={formatDate}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: '#9CA3AF' }}
            tickFormatter={(value) => `${value}€`}
          />
          <Tooltip content={CustomTooltip} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-gray-300">{value}</span>}
          />
          <Bar
            dataKey="credit"
            name="Crédit"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
          <Bar
            dataKey="debit"
            name="Débit"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TransactionsPieCharts = ({ transactions }) => {
  const colors = [
    '#10B981', // vert
    '#3B82F6', // bleu
    '#F59E0B', // orange
    '#EC4899', // rose
    '#8B5CF6', // violet
    '#6366F1'  // indigo
  ];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }) => {
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    const textAnchor = cos >= 0 ? 'start' : 'end';
    const percentage = (percent * 100).toFixed(1);
    
    if (percentage < 5) return null; // Ne pas afficher les labels pour les petites valeurs

    return (
      <g>
        {/* Ligne de connexion */}
        <line
          x1={cx + (outerRadius + 10) * cos}
          y1={cy + (outerRadius + 10) * sin}
          x2={x}
          y2={y}
          stroke="#6B7280"
          strokeWidth={1}
        />
        {/* Texte */}
        <text
          x={x}
          y={y}
          fill="#E5E7EB"
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={12}
        >
          {`${name} (${percentage}%)`}
        </text>
      </g>
    );
  };

  // Préparation des données pour le camembert des catégories
  const categoryData = transactions
    .filter(t => parseFloat(t.montant) < 0)
    .reduce((acc, t) => {
      const category = t.categorie || 'Non catégorisé';
      const amount = Math.abs(parseFloat(t.montant));
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

  const total = Object.values(categoryData).reduce((sum, value) => sum + value, 0);
  const categoryPieData = Object.entries(categoryData)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / total) * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value);

  // Préparation des données pour le camembert des types de paiement
  const paymentTypeData = transactions.reduce((acc, t) => {
    const type = t.type_paiement || 'Non spécifié';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const totalPayments = Object.values(paymentTypeData).reduce((sum, value) => sum + value, 0);
  const paymentTypePieData = Object.entries(paymentTypeData)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / totalPayments) * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-lg">
          <p className="text-gray-200 font-semibold">{data.name}</p>
          <p className="text-gray-300">
            {categoryPieData.includes(data) 
              ? `${Number(data.value).toFixed(2)}€`
              : `${data.value} transactions`
            }
          </p>
          <p className="text-gray-400">{data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center space-x-12">
        {/* Graphique des dépenses */}
        <div className="w-1/2 h-[400px]">
          <h3 className="text-lg font-semibold text-gray-200 text-center mb-4">
            Répartition des dépenses
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryPieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={60}
                paddingAngle={1}
                dataKey="value"
              >
                {categoryPieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    strokeWidth={1}
                    stroke="rgba(0, 0, 0, 0.2)"
                  />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique des types de paiement */}
        <div className="w-1/2 h-[400px]">
          <h3 className="text-lg font-semibold text-gray-200 text-center mb-4">
            Types de paiement
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentTypePieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={60}
                paddingAngle={1}
                dataKey="value"
              >
                {paymentTypePieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    strokeWidth={1}
                    stroke="rgba(0, 0, 0, 0.2)"
                  />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
