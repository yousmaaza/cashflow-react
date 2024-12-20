import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

export const FinancialSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="financial-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="stat-label">Total Balance</p>
            <h3 className="stat-value">$24,563.00</h3>
          </div>
          <div className="p-2 bg-primary-50 rounded-full">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="financial-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="stat-label">Monthly Income</p>
            <h3 className="stat-value">$8,350.00</h3>
            <span className="text-sm text-green-500 flex items-center mt-1">
              <ArrowUpRight className="w-4 h-4" />
              +2.5%
            </span>
          </div>
        </div>
      </Card>

      <Card className="financial-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="stat-label">Monthly Expenses</p>
            <h3 className="stat-value">$5,350.00</h3>
            <span className="text-sm text-red-500 flex items-center mt-1">
              <ArrowDownRight className="w-4 h-4" />
              +12.5%
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};