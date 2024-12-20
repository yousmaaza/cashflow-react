import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../components/layouts/main-layout'

const DashboardPage = () => import('../features/dashboard/pages/dashboard')
const TransactionsPage = () => import('../features/transactions/pages/transactions')
const AnalyticsPage = () => import('../features/analytics/pages/analytics')

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
        path: 'analytics',
        element: <AnalyticsPage />,
      },
    ],
  },
])