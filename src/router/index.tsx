import { createHashRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'


const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  }
])

export default router