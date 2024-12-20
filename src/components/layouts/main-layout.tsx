import { Outlet } from 'react-router-dom'
import { Navbar } from './navbar'

export function MainLayout() {
  return (
    <div className="relative min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}