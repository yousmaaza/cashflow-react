import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface KPICardProps {
  title: string;
  value: string | number | null;
  icon: React.ReactNode;
  loading?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  } | null;
  valueFormatter?: (value: number | null) => string;
}

const defaultFormatter = (value: number | null): string => {
  if (value === null || value === undefined) return '0,00 €';
  return value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
};

const KPICard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  loading = false,
  valueFormatter = defaultFormatter 
}: KPICardProps) => {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-6 rounded" />
        </div>
        <Skeleton className="h-8 w-24 mb-2" />
        <Skeleton className="h-4 w-20" />
      </Card>
    );
  }

  const formattedValue = typeof value === 'number' ? valueFormatter(value) : valueFormatter(null);

  return (
    <Card className="p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground font-medium">{title}</div>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="text-2xl font-bold tracking-tight">{formattedValue}</div>
        {trend !== null && trend !== undefined && (
          <div
            className={`text-sm font-medium flex items-center gap-1 ${
              trend.isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
            }`}
          >
            <span>{trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}%</span>
            <span className="text-muted-foreground text-xs">
              vs mois dernier
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default KPICard;