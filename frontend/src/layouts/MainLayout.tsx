import { Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="flex h-14 items-center px-4">
          <a href="/" className="flex items-center gap-2 font-semibold text-lg">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md text-white font-bold text-sm"
              style={{ backgroundColor: '#3388BB' }}
            >
              AB
            </div>
            Agents Bridge
          </a>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
