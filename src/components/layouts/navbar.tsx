import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '../theme/theme-toggle'
import { Home, ListTodo, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const location = useLocation()
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Transactions', href: '/transactions', icon: ListTodo },
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">CashFlow</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'nav-link',
                    location.pathname === item.href && 'nav-link-active'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}