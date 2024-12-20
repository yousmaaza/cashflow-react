import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Transaction } from "@/data/mockTransactions";
import { useTheme } from "@/hooks/use-theme";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];

interface ExpensesByCategoryChartProps {
  transactions: Transaction[];
}

const ExpensesByCategoryChart = ({ transactions }: ExpensesByCategoryChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const expensesByCategory = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, transaction) => {
      const amount = Math.abs(transaction.amount);
      acc[transaction.category] = (acc[transaction.category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expensesByCategory).map(([category, value]) => ({
    name: category,
    value: Number(value.toFixed(2))
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Dépenses par catégorie</h3>
      <div className="h-[300px]">
        <ChartContainer config={{}} className="w-full h-full">
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
        </ChartContainer>
      </div>
    </Card>
  );
};

export default ExpensesByCategoryChart;