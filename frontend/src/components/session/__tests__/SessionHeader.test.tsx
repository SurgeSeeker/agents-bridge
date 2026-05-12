import { render, screen } from '@testing-library/react'
import SessionHeader from '@/components/session/SessionHeader'
import type { Session } from '@/types/session'

const baseSession: Session = {
  id: 's1',
  name: 'Test Session',
  status: 'in_progress',
  branch: 'main',
  projectId: 'p1',
  messages: [],
  lastActivity: '2026-05-12T10:00:00Z',
}

describe('SessionHeader', () => {
  // Scenario 1: Render session name
  it('renders session name in an h2 element', () => {
    render(
      <SessionHeader
        session={baseSession}
        projectName="My Project"
        onPause={() => {}}
        onSendCommand={() => {}}
      />,
    )

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Session')
  })

  // Scenario 2: Render status badge
  it('renders status label and colored status dot', () => {
    const { container } = render(
      <SessionHeader
        session={baseSession}
        projectName="My Project"
        onPause={() => {}}
        onSendCommand={() => {}}
      />,
    )

    expect(screen.getByText('运行中')).toBeInTheDocument()

    const statusDot = container.querySelector('span.h-2.w-2.rounded-full')
    expect(statusDot).toBeInTheDocument()
    expect(statusDot).toHaveStyle({ backgroundColor: '#22c55e' })
  })
})
