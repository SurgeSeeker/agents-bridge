import { render, screen } from '@testing-library/react'
import SessionView from '@/components/session/SessionView'
import type { Session } from '@/types/session'

const session: Session = {
  id: 's1',
  name: 'Test Session',
  status: 'in_progress',
  branch: 'main',
  projectId: 'p1',
  messages: [
    { id: 'm1', role: 'human', content: 'Hello', timestamp: '2026-05-12T10:00:00Z' },
    { id: 'm2', role: 'agent', content: 'Hi there', timestamp: '2026-05-12T10:01:00Z' },
  ],
  lastActivity: '2026-05-12T10:01:00Z',
}

describe('SessionView', () => {
  // Scenario 1: Renders SessionHeader — session name visible
  it('renders session name from SessionHeader', () => {
    render(<SessionView session={session} projectName="My Project" />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Session')
  })

  // Scenario 2: Renders MessageList — message content visible
  it('renders message content from MessageList', () => {
    render(<SessionView session={session} projectName="My Project" />)

    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi there')).toBeInTheDocument()
  })

  // Scenario 3: Renders ChatInput — placeholder and button visible
  it('renders ChatInput with placeholder and send button', () => {
    render(<SessionView session={session} projectName="My Project" />)

    expect(screen.getByPlaceholderText('输入消息...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '发送' })).toBeInTheDocument()
  })

  // Scenario 4: Empty messages does not crash
  it('does not crash when session has no messages', () => {
    const emptySession: Session = { ...session, messages: [] }
    render(<SessionView session={emptySession} projectName="My Project" />)

    // SessionHeader still renders
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Test Session')

    // ChatInput still renders
    expect(screen.getByPlaceholderText('输入消息...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '发送' })).toBeInTheDocument()

    // No message content rendered
    expect(screen.queryByText('Hello')).not.toBeInTheDocument()
  })
})
