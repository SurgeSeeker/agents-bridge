import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SessionItem from '@/components/sidebar/SessionItem'

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

describe('SessionItem', () => {
  it('scenario 1: renders session name', () => {
    render(
      <SessionItem
        session={mockSession({ name: 'My Session' })}
        isActive={false}
        onClick={() => {}}
      />
    )
    expect(screen.getByText('My Session')).toBeInTheDocument()
  })

  it('scenario 2: active state highlight style', () => {
    const { rerender } = render(
      <SessionItem
        session={mockSession()}
        isActive={true}
        onClick={() => {}}
      />
    )
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-[#e8f4fd]')
    expect(button.className).toContain('text-[#3388BB]')

    rerender(
      <SessionItem
        session={mockSession()}
        isActive={false}
        onClick={() => {}}
      />
    )
    const buttonInactive = screen.getByRole('button')
    expect(buttonInactive.className).not.toContain('bg-[#e8f4fd]')
    expect(buttonInactive.className).not.toContain('text-[#3388BB]')
  })

  it('scenario 3: click calls onSelectSession', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <SessionItem
        session={mockSession()}
        isActive={false}
        onClick={onClick}
      />
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
