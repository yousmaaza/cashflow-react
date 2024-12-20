import { Link } from 'react-router-dom'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            Cashflow
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className="text-muted-foreground hover:text-foreground"
            >
              Transactions
            </Link>
            <Link
              to="/settings"
              className="text-muted-foreground hover:text-foreground"
            >
              Settings
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
