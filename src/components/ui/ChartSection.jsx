import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { BarChart3, LineChart as LineChartIcon } from 'lucide-react';

const ChartSection = ({ transactions, filteredTransactions }) => {
  const [chartType, setChartType] = useState('daily');
  const [showDebit, setShowDebit] = useState(true);
  const [showCredit, setShowCredit] = useState(true);
  const [visualType, setVisualType] = useState('line');

  // Utilise les transactions filtrées si disponibles, sinon utilise toutes les transactions
  const activeTransactions = filteredTransactions || transactions;

  const chartData = useMemo(() => {
    if (!activeTransactions.length) return [];

    const groupTransactions = () => {
      const groupedData = {};

      switch (chartType) {
        case 'daily':
          activeTransactions.forEach(transaction => {
            const date = transaction.date;
            if (!groupedData[date]) {
              groupedData[date] = { 
                date, 
                debit: 0, 
                credit: 0,
                balance: 0 
              };
            }
            if (transaction.montant >= 0) {
              groupedData[date].credit += transaction.montant;
            } else {
              groupedData[date].debit += Math.abs(transaction.montant);
            }
            groupedData[date].balance = groupedData[date].credit - groupedData[date].debit;
          });
          break;

        case 'category':
          activeTransactions.forEach(transaction => {
            const category = transaction.categorie || 'Non catégorisé';
            if (!groupedData[category]) {
              groupedData[category] = { 
                category, 
                debit: 0, 
                credit: 0,
                balance: 0 
              };
            }
            if (transaction.montant >= 0) {
              groupedData[category].credit += transaction.montant;
            } else {
              groupedData[category].debit += Math.abs(transaction.montant);
            }
            groupedData[category].balance = groupedData[category].credit - groupedData[category].debit;
          });
          break;

        case 'type':
          activeTransactions.forEach(transaction => {
            const type = transaction.type || 'Non défini';
            if (!groupedData[type]) {
              groupedData[type] = { 
                type, 
                debit: 0, 
                credit: 0,
                balance: 0 
              };
            }
            if (transaction.montant >= 0) {
              groupedData[type].credit += transaction.montant;
            } else {
              groupedData[type].debit += Math.abs(transaction.montant);
            }
            groupedData[type].balance = groupedData[type].credit - groupedData[type].debit;
          });
          break;
      }

      return Object.values(groupedData);
    };

    const data = groupTransactions();
    return chartType === 'daily' 
      ? data.sort((a, b) => new Date(a.date) - new Date(b.date))
      : data;
  }, [activeTransactions, chartType]);

  const formatValue = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {formatValue(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartComponent = visualType === 'line' ? LineChart : AreaChart;
  const DataComponent = visualType === 'line' ? Line : Area;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Évolution des transactions{filteredTransactions ? ' (filtrées)' : ''}</h2>
        <div className="flex items-center space-x-2">
          <button
            className={`p-2 rounded-md transition-colors ${
              visualType === 'line' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setVisualType('line')}
          >
            <LineChartIcon className="h-4 w-4" />
          </button>
          <button
            className={`p-2 rounded-md transition-colors ${
              visualType === 'area' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setVisualType('area')}
          >
            <BarChart3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="w-full md:w-48">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="daily">Journalier</option>
            <option value="category">Par catégorie</option>
            <option value="type">Par type</option>
          </select>
        </div>
        
        <div className="flex items-center gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDebit}
              onChange={() => setShowDebit(!showDebit)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium">Débit</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCredit}
              onChange={() => setShowCredit(!showCredit)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium">Crédit</span>
          </label>
        </div>
      </div>

      <div className="h-96 w-full mt-4">
        <ResponsiveContainer>
          <ChartComponent data={chartData}>
            <defs>
              <linearGradient id="creditGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="debitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={chartType === 'daily' ? 'date' : chartType}
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={formatValue}
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {showDebit && (
              <DataComponent
                type="monotone"
                dataKey="debit"
                name="Débit"
                stroke="#EF4444"
                fill="url(#debitGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {showCredit && (
              <DataComponent
                type="monotone"
                dataKey="credit"
                name="Crédit"
                stroke="#10B981"
                fill="url(#creditGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;