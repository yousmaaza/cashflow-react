import { Outlet } from 'react-router-dom'
import { Navbar } from './navbar'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container py-6 px-4 mx-auto max-w-[1400px]">
        <Outlet />
      </main>
      <footer className="border-t py-6 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cashflow. Tous droits réservés.
        </div>
      </footer>
    </div>
  )
}