import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layouts/navbar'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
}
