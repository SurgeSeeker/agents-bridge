import { render, screen } from '@testing-library/react'
import { MainLayout } from '@/layouts/MainLayout'

// Mock Sidebar to avoid rendering its full subtree
vi.mock('@/components/sidebar/Sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}))

// Mock SessionView to avoid rendering its full subtree
vi.mock('@/components/session/SessionView', () => ({
  default: () => <div data-testid="session-view">SessionView</div>,
}))

// Mock Outlet from react-router-dom since no router is needed for this test
vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}))

describe('MainLayout', () => {
  // Scenario 1: Render sidebar
  it('renders sidebar', () => {
    render(<MainLayout />)

    // Sidebar should be rendered inside the layout
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  // Scenario 2: Render Outlet when no active session
  it('renders Outlet when no session is active', () => {
    render(<MainLayout />)

    // When activeSessionId is null, Outlet should be rendered
    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })
})
