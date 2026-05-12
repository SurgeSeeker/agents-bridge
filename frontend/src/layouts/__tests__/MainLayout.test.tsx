import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MainLayout } from '@/layouts/MainLayout'

// Mock Sidebar to avoid rendering its full subtree; exposes onSelectSession callback
vi.mock('@/components/sidebar/Sidebar', () => ({
  default: ({ onSelectSession }: { onSelectSession: (id: string) => void }) => (
    <div data-testid="sidebar">
      <button data-testid="select-session" onClick={() => onSelectSession('session-1')}>
        Sidebar
      </button>
    </div>
  ),
}))

// Mock SessionView to avoid rendering its full subtree
vi.mock('@/components/session/SessionView', () => ({
  default: ({ session }: { session: { id: string } }) => (
    <div data-testid="session-view">SessionView ({session.id})</div>
  ),
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

  // Scenario 3: Render SessionView when a session is selected via Sidebar
  it('renders SessionView when a session is selected', async () => {
    const user = userEvent.setup()
    render(<MainLayout />)

    // Simulate clicking a session in Sidebar to trigger onSelectSession
    await user.click(screen.getByTestId('select-session'))

    // SessionView should now be rendered instead of Outlet
    expect(screen.getByTestId('session-view')).toBeInTheDocument()
    expect(screen.queryByTestId('outlet')).not.toBeInTheDocument()
  })
})
