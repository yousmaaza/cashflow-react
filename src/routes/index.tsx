import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/main-layout'
import { DashboardPage } from '@/features/analytics/pages/dashboard'
import { TransactionsPage } from '@/features/transactions/pages/transactions'
import { SettingsPage } from '@/features/settings/pages/settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'transactions',
        element: <TransactionsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])
