import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Wallet } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-finance-primary">
                <Wallet className="h-6 w-6" />
                <span>CashFlow App</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-foreground hover:text-finance-primary inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/transactions"
                className="text-foreground hover:text-finance-primary inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Transactions
              </Link>
              <Link
                to="/advisor"
                className="text-foreground hover:text-finance-primary inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Conseiller
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;