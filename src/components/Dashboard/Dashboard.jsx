import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Remplacer la partie du graphique dans le return par :

<div className="relative">
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        scale="point"
        tick={{ fill: '#a3a3a3' }}
      />
      <YAxis
        tick={{ fill: '#a3a3a3' }}
        tickFormatter={(value) => `${value}€`}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: '#1e293b',
          border: '1px solid #374151',
          borderRadius: '4px'
        }}
        labelFormatter={(label) => `Date: ${label}`}
        formatter={(value, name) => [`${value}€`, name === 'debit' ? 'Débit' : 'Crédit']}
      />
      <Legend />
      <Bar dataKey="debit" name="Débit" fill="#ef4444" />
      <Bar dataKey="credit" name="Crédit" fill="#22c55e" />
    </BarChart>
  </ResponsiveContainer>
</div>