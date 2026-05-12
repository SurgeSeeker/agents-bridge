import { render, screen } from '@testing-library/react'
import MessageBubble from '@/components/session/MessageBubble'
import type { Message } from '@/types/session'

describe('MessageBubble', () => {
  // Scenario 1: Human message — right-aligned, "H" avatar, gray-50 bubble
  it('renders human message right-aligned with H avatar and gray-50 bubble', () => {
    const message: Message = {
      id: 'msg-1',
      role: 'human',
      content: 'Hello, this is a test',
      timestamp: '2026-05-12T10:00:00Z',
    }
    const { container } = render(<MessageBubble message={message} />)

    // Outer div has ml-auto (right-aligned)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv).toHaveClass('ml-auto')

    // Blue circular "H" avatar
    const avatar = screen.getByText('H')
    expect(avatar).toHaveClass('bg-[#e8f4fd]', 'text-[#3388BB]')

    // gray-50 rounded bubble (rounded-2xl shadow-sm)
    const bubbleContent = screen.getByText('Hello, this is a test')
    const bubble = bubbleContent.closest('.bg-gray-50')
    expect(bubble).toBeInTheDocument()
    expect(bubble).toHaveClass('rounded-2xl', 'shadow-sm')
  })

  // Scenario 2: Human message shows timestamp
  it('shows formatted timestamp for human messages', () => {
    const message: Message = {
      id: 'msg-2',
      role: 'human',
      content: 'Another human message',
      timestamp: '2026-05-12T10:00:00Z',
    }
    render(<MessageBubble message={message} />)

    expect(screen.getByText(/^\d{2}:\d{2}$/)).toBeInTheDocument()
  })

  // Scenario 3: Agent message — full-width, 15px text, no bubble
  it('renders agent message full-width with 15px text and no bubble', () => {
    const message: Message = {
      id: 'msg-3',
      role: 'agent',
      content: 'agent reply',
      timestamp: '2026-05-12T10:00:00Z',
    }
    const { container } = render(<MessageBubble message={message} />)

    // Full width (w-full, no ml-auto)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv).toHaveClass('w-full')
    expect(outerDiv).not.toHaveClass('ml-auto')

    // 15px text
    const contentText = screen.getByText('agent reply')
    expect(contentText).toHaveClass('text-[15px]')

    // No tool call area
    expect(container.querySelector('.border-l-2')).not.toBeInTheDocument()
  })

  // Scenario 4: Agent message with toolCalls — renders ToolCallItem
  it('renders ToolCallItem for agent messages with toolCalls', () => {
    const message: Message = {
      id: 'msg-4',
      role: 'agent',
      content: 'Agent with tools',
      timestamp: '2026-05-12T10:00:00Z',
      toolCalls: [
        { toolCallId: 'tc-1', kind: 'read', title: 'My Tool', status: 'completed' },
      ],
    }
    const { container } = render(<MessageBubble message={message} />)

    // ToolCallItem renders the tool title
    expect(screen.getByText('My Tool')).toBeInTheDocument()

    // Tool call container with expected classes
    const toolCallContainer = container.querySelector('.border-l-2')
    expect(toolCallContainer).toBeInTheDocument()
    expect(toolCallContainer).toHaveClass('border-gray-200', 'pl-3')
  })

  // Scenario 5: Agent message — no toolCalls area when toolCalls is undefined
  it('does not render toolCalls area when toolCalls is undefined', () => {
    const message: Message = {
      id: 'msg-5',
      role: 'agent',
      content: 'No tools here',
      timestamp: '2026-05-12T10:00:00Z',
      toolCalls: undefined,
    }
    const { container } = render(<MessageBubble message={message} />)

    expect(container.querySelector('.border-l-2')).not.toBeInTheDocument()
  })

  // Scenario 6: Agent message shows timestamp
  it('shows formatted timestamp for agent messages', () => {
    const message: Message = {
      id: 'msg-6',
      role: 'agent',
      content: 'Agent reply with timestamp',
      timestamp: '2026-05-12T10:00:00Z',
    }
    render(<MessageBubble message={message} />)

    expect(screen.getByText(/^\d{2}:\d{2}$/)).toBeInTheDocument()
  })
})
