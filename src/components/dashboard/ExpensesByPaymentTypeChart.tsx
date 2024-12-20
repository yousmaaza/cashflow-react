import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Transaction } from "@/data/mockTransactions";
import { useTheme } from "@/hooks/use-theme";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface ExpensesByPaymentTypeChartProps {
  transactions: Transaction[];
}

const ExpensesByPaymentTypeChart = ({ transactions }: ExpensesByPaymentTypeChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const expensesByType = transactions
    .filter(t => t.montant < 0)
    .reduce((acc, transaction) => {
      const montant = Math.abs(transaction.montant);
      acc[transaction.type] = (acc[transaction.type] || 0) + montant;
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expensesByType).map(([type, value]) => ({
    name: type,
    value: Number(value.toFixed(2))
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Dépenses par type de paiement</h3>
      <div className="h-[300px]">
        <ChartContainer config={{}} className="w-full h-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                formatter={(value) => <span style={{ color: isDark ? "#9ca3af" : "#64748b" }}>{value}</span>}
              />
              <ChartTooltip 
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  color: isDark ? "#ffffff" : "#000000"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default ExpensesByPaymentTypeChart;