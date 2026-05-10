import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
