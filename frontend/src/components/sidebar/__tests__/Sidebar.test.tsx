import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sidebar from '@/components/sidebar/Sidebar'

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
  sessions: [mockSession()],
  ...overrides,
})

describe('Sidebar', () => {
  it('scenario 1: renders title "工作区" with Folder icon', () => {
    const { container } = render(
      <Sidebar
        projects={[]}
        activeSessionId={null}
        onSelectSession={() => {}}
        onAddClick={() => {}}
      />
    )
    // Title text visible
    expect(screen.getByText('工作区')).toBeInTheDocument()
    // Folder icon SVG exists
    const folderIcon = container.querySelector('.lucide-folder')
    expect(folderIcon).toBeInTheDocument()
  })

  it('scenario 2: renders ProjectGroup per project', () => {
    const project2 = { ...mockProject({ id: 'p2', name: 'agents-bridge', icon: '🔗' }) }
    render(
      <Sidebar
        projects={[mockProject(), project2]}
        activeSessionId={null}
        onSelectSession={() => {}}
        onAddClick={() => {}}
      />
    )
    expect(screen.getByText('Retrace')).toBeInTheDocument()
    expect(screen.getByText('agents-bridge')).toBeInTheDocument()
  })

  it('scenario 3: click plus button calls onAddClick', async () => {
    const user = userEvent.setup()
    const onAddClick = vi.fn()
    render(
      <Sidebar
        projects={[]}
        activeSessionId={null}
        onSelectSession={() => {}}
        onAddClick={onAddClick}
      />
    )
    // With empty projects, the only button is the Plus button
    await user.click(screen.getByRole('button'))
    expect(onAddClick).toHaveBeenCalledTimes(1)
  })

  it('scenario 4: renders with activeSessionId without crashing', () => {
    render(
      <Sidebar
        projects={[mockProject()]}
        activeSessionId="s1"
        onSelectSession={() => {}}
        onAddClick={() => {}}
      />
    )
    expect(screen.getByText('Retrace')).toBeInTheDocument()
    expect(screen.getByText('Test Session')).toBeInTheDocument()
  })
})
