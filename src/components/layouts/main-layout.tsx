import { Outlet } from 'react-router-dom'
import { Navbar } from './navbar'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  )
}