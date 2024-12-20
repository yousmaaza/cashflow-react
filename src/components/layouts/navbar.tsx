import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ThemeToggle } from '../theme-toggle'

export function Navbar() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            Cashflow
          </Link>
          <nav className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link to="/">Tableau de bord</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/transactions">Transactions</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/analytics">Analyses</Link>
            </Button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}