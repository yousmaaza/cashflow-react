import { Card } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const KPICard = ({ title, value, icon, trend }: KPICardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="text-gray-500">{title}</div>
        <div className="text-finance-primary">{icon}</div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div
            className={`mt-2 text-sm ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : "-"}{trend.value}% vs last month
          </div>
        )}
      </div>
    </Card>
  );
};

export default KPICard;