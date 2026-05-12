import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectGroup from '@/components/sidebar/ProjectGroup'

const mockSession = (overrides = {}) => ({
  id: 's1',
  name: 'Test Session',
  status: 'in_progress' as const,
  branch: 'main',
  projectId: 'p1',
  messages: [],
  lastActivity: '2026-05-12T10:00:00Z',
  ...overrides,
})

const mockProject = (overrides = {}) => ({
  id: 'p1',
  name: 'Retrace',
  icon: '🔄',
  sessions: [
    mockSession(),
    mockSession({ id: 's2', name: 'Session 2' }),
  ],
  ...overrides,
})

describe('ProjectGroup', () => {
  it('scenario 1: project name visible', () => {
    render(
      <ProjectGroup
        project={mockProject()}
        activeSessionId={null}
        onSelectSession={() => {}}
      />
    )
    expect(screen.getByText('Retrace')).toBeInTheDocument()
  })

  it('scenario 2: renders SessionItem per session', () => {
    render(
      <ProjectGroup
        project={mockProject()}
        activeSessionId={null}
        onSelectSession={() => {}}
      />
    )
    expect(screen.getByText('Test Session')).toBeInTheDocument()
    expect(screen.getByText('Session 2')).toBeInTheDocument()
  })

  it('scenario 3: collapsible expand/collapse', async () => {
    const user = userEvent.setup()
    render(
      <ProjectGroup
        project={mockProject()}
        activeSessionId={null}
        onSelectSession={() => {}}
      />
    )

    // Initially open (useState(true))
    expect(screen.getByText('Test Session')).toBeInTheDocument()

    // Click trigger to collapse
    await user.click(screen.getByText('Retrace'))

    // After collapse - session items should not be visible
    expect(screen.queryByText('Test Session')).not.toBeInTheDocument()

    // Click trigger to expand again
    await user.click(screen.getByText('Retrace'))

    // After expand - session items visible again
    expect(screen.getByText('Test Session')).toBeInTheDocument()
  })
})
