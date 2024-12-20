import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Transaction } from "@/data/mockTransactions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { format, subMonths, parseISO, startOfMonth, endOfMonth } from "date-fns";
import { fr } from "date-fns/locale";
import { useTheme } from "@/hooks/use-theme";

interface ExpensesOverTimeChartProps {
  transactions: Transaction[];
}

type TimeRange = "3m" | "6m" | "1y" | "all";

const ExpensesOverTimeChart = ({ transactions }: ExpensesOverTimeChartProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const categories = ["all", ...new Set(transactions.map(t => t.categorie))];

  const getFilteredTransactions = () => {
    let filtered = selectedCategory === "all" 
      ? transactions 
      : transactions.filter(t => t.categorie === selectedCategory);

    const now = new Date();
    if (timeRange !== "all") {
      const months = timeRange === "3m" ? 3 : timeRange === "6m" ? 6 : 12;
      const startDate = subMonths(now, months);
      filtered = filtered.filter(t => parseISO(t.date) >= startDate);
    }

    return filtered;
  };

  const expensesByMonth = getFilteredTransactions()
    .filter(t => t.montant < 0)
    .reduce((acc, transaction) => {
      const date = startOfMonth(parseISO(transaction.date));
      const monthKey = format(date, 'MMM yyyy', { locale: fr });
      
      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += Math.abs(transaction.montant);
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expensesByMonth)
    .map(([date, value]) => ({
      date,
      amount: Number(value.toFixed(2))
    }))
    .sort((a, b) => {
      const [monthA, yearA] = a.date.split(' ');
      const [monthB, yearB] = b.date.split(' ');
      const dateA = new Date(`${monthA} 01 ${yearA}`);
      const dateB = new Date(`${monthB} 01 ${yearB}`);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold">Évolution des dépenses</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRange)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toute la période</SelectItem>
              <SelectItem value="3m">3 derniers mois</SelectItem>
              <SelectItem value="6m">6 derniers mois</SelectItem>
              <SelectItem value="1y">Dernière année</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.filter(c => c !== "all").map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-[300px]">
        <ChartContainer config={{}} className="w-full h-full">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
            <Bar 
              dataKey="amount" 
              fill={isDark ? "#60a5fa" : "#2563eb"}
              radius={[4, 4, 0, 0]}
            />
            <CartesianGrid stroke={isDark ? "#374151" : "#e5e7eb"} strokeDasharray="5 5" />
            <XAxis 
              dataKey="date" 
              stroke={isDark ? "#9ca3af" : "#64748b"}
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fill: isDark ? "#9ca3af" : "#64748b" }}
            />
            <YAxis 
              stroke={isDark ? "#9ca3af" : "#64748b"}
              fontSize={12}
              tickFormatter={(value) => `${value}€`}
              tick={{ fill: isDark ? "#9ca3af" : "#64748b" }}
            />
            <ChartTooltip 
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                color: isDark ? "#ffffff" : "#000000"
              }}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default ExpensesOverTimeChart;