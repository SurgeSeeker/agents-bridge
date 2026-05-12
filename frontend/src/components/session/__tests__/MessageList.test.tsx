import { render, screen } from '@testing-library/react'
import MessageList from '@/components/session/MessageList'
import type { Message } from '@/types/session'

const messages: Message[] = [
  { id: 'm1', role: 'human', content: 'Hello', timestamp: '2026-05-12T10:00:00Z' },
  { id: 'm2', role: 'agent', content: 'Hi there', timestamp: '2026-05-12T10:01:00Z' },
]

describe('MessageList', () => {
  // Scenario 1: Pass 2 messages — verify 2 MessageBubble components are rendered
  it('renders a MessageBubble for each message', () => {
    render(<MessageList messages={messages} />)

    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi there')).toBeInTheDocument()
  })

  // Scenario 2: Pass empty array — verify no message content is rendered
  it('renders nothing when messages array is empty', () => {
    const { container } = render(<MessageList messages={[]} />)

    expect(screen.queryByText('Hello')).not.toBeInTheDocument()
    expect(screen.queryByText('Hi there')).not.toBeInTheDocument()

    // The container (ScrollArea wrapper) should still be present
    const scrollAreaRoot = container.querySelector('[data-slot="scroll-area"]')
    expect(scrollAreaRoot).toBeInTheDocument()

    // Inner wrapper div with padding should exist
    const innerDiv = scrollAreaRoot?.querySelector('.space-y-4')
    expect(innerDiv).toBeInTheDocument()
    expect(innerDiv?.children.length).toBe(0)
  })

  // Scenario 3: Verify ScrollArea container is rendered
  it('renders within a ScrollArea', () => {
    const { container } = render(<MessageList messages={messages} />)

    const scrollAreaRoot = container.querySelector('[data-slot="scroll-area"]')
    expect(scrollAreaRoot).toBeInTheDocument()
    expect(scrollAreaRoot).toHaveClass('flex-1')

    // Viewport should contain the messages wrapper
    const viewport = container.querySelector('[data-slot="scroll-area-viewport"]')
    expect(viewport).toBeInTheDocument()
  })
})
