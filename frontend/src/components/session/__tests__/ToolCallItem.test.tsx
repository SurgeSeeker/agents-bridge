import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToolCallItem from '@/components/session/ToolCallItem'
import type { ToolCallData, ToolKind } from '@/types/session'

const baseToolCall: ToolCallData = {
  toolCallId: 'test-1',
  kind: 'read',
  title: 'Read file',
  status: 'completed',
}

describe('ToolCallItem', () => {
  // Scenario 1: Icon mapping for each ToolKind
  describe('Icon mapping', () => {
    const kinds: ToolKind[] = [
      'read',
      'edit',
      'delete',
      'move',
      'search',
      'execute',
      'think',
      'fetch',
      'switch_mode',
      'other',
    ]

    it.each(kinds)('renders an SVG icon for kind "%s"', (kind) => {
      const { container } = render(
        <ToolCallItem toolCall={{ ...baseToolCall, kind, status: 'pending' }} />,
      )
      const button = container.querySelector('button')
      const svg = button?.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  // Scenario 2-5: Status indicators
  describe('Status indicators', () => {
    it('renders a gray dot for pending status', () => {
      const { container } = render(
        <ToolCallItem toolCall={{ ...baseToolCall, status: 'pending' }} />,
      )
      const dot = container.querySelector('.bg-gray-300')
      expect(dot).toBeInTheDocument()
      expect(dot).toHaveClass('h-1.5', 'w-1.5')
    })

    it('renders a spinning Loader2 for in_progress status', () => {
      const { container } = render(
        <ToolCallItem toolCall={{ ...baseToolCall, status: 'in_progress' }} />,
      )
      const svg = container.querySelector('.h-3.w-3')
      expect(svg).toBeInTheDocument()
      expect(svg?.tagName).toBe('svg')
    })

    it('renders a green checkmark for completed status', () => {
      render(<ToolCallItem toolCall={{ ...baseToolCall, status: 'completed' }} />)
      expect(screen.getByText('✓')).toBeInTheDocument()
    })

    it('renders a red cross for failed status', () => {
      render(<ToolCallItem toolCall={{ ...baseToolCall, status: 'failed' }} />)
      expect(screen.getByText('✗')).toBeInTheDocument()
    })
  })

  // Scenario 6: Expand/collapse interaction
  describe('Expand/collapse interaction', () => {
    it('toggles detail content visibility on click', async () => {
      const user = userEvent.setup()
      const toolCall: ToolCallData = {
        ...baseToolCall,
        rawInput: 'test input',
      }
      render(<ToolCallItem toolCall={toolCall} />)

      // Initially not in the DOM at all
      expect(screen.queryByText('test input')).not.toBeInTheDocument()

      // Click to expand
      await user.click(screen.getByRole('button'))
      expect(screen.getByText('test input')).toBeInTheDocument()

      // Click to collapse
      await user.click(screen.getByRole('button'))
      // Wait for AnimatePresence exit animation to finish, then assert element is gone
      await waitForElementToBeRemoved(() => screen.queryByText('test input'))
    })
  })

  // Scenario 7-8: Content block rendering
  describe('Content block rendering', () => {
    it('renders terminal blocks with $ prefix', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <ToolCallItem
          toolCall={{
            ...baseToolCall,
            content: [{ type: 'terminal', text: 'ls\npwd' }],
          }}
        />,
      )
      await user.click(screen.getByRole('button'))

      expect(screen.getByText('ls')).toBeInTheDocument()
      expect(screen.getByText('pwd')).toBeInTheDocument()

      const prefixElements = container.querySelectorAll('span.text-gray-500')
      expect(prefixElements.length).toBe(2)
      prefixElements.forEach((el) => {
        expect(el.textContent).toContain('$')
      })
    })

    it('renders diff blocks with green/red coloring', async () => {
      const user = userEvent.setup()
      render(
        <ToolCallItem
          toolCall={{
            ...baseToolCall,
            content: [{ type: 'diff', text: '+added\n-removed\nneutral' }],
          }}
        />,
      )
      await user.click(screen.getByRole('button'))

      const addedLine = screen.getByText('+added')
      const removedLine = screen.getByText('-removed')
      const neutralLine = screen.getByText('neutral')

      expect(addedLine).toHaveClass('text-green-400')
      expect(removedLine).toHaveClass('text-red-400')
      expect(neutralLine).not.toHaveClass('text-green-400')
      expect(neutralLine).not.toHaveClass('text-red-400')
    })

    it('renders text blocks as-is', async () => {
      const user = userEvent.setup()
      render(
        <ToolCallItem
          toolCall={{
            ...baseToolCall,
            content: [{ type: 'text', text: 'plain text' }],
          }}
        />,
      )
      await user.click(screen.getByRole('button'))

      expect(screen.getByText('plain text')).toBeInTheDocument()
    })
  })

  // Scenario 9: Optional rawInput field
  describe('rawInput', () => {
    it('displays rawInput label and text when provided', async () => {
      const user = userEvent.setup()
      render(
        <ToolCallItem
          toolCall={{
            ...baseToolCall,
            rawInput: 'some input text',
          }}
        />,
      )
      await user.click(screen.getByRole('button'))

      expect(screen.getByText('Input')).toBeInTheDocument()
      expect(screen.getByText('some input text')).toBeInTheDocument()
    })
  })

  // Scenario 10: Optional rawOutput field
  describe('rawOutput', () => {
    it('displays rawOutput label and text when provided', async () => {
      const user = userEvent.setup()
      render(
        <ToolCallItem
          toolCall={{
            ...baseToolCall,
            rawOutput: 'some output text',
          }}
        />,
      )
      await user.click(screen.getByRole('button'))

      expect(screen.getByText('Output')).toBeInTheDocument()
      expect(screen.getByText('some output text')).toBeInTheDocument()
    })
  })

  // Scenario 11: No content/rawInput/rawOutput
  describe('Empty state', () => {
    it('renders no extraneous content when none provided', async () => {
      const user = userEvent.setup()
      const { container } = render(<ToolCallItem toolCall={baseToolCall} />)
      await user.click(screen.getByRole('button'))

      const darkContainer = container.querySelector('.bg-gray-900')
      expect(darkContainer).toBeInTheDocument()
      expect(darkContainer?.textContent?.trim()).toBe('')

      expect(screen.queryByText('Input')).not.toBeInTheDocument()
      expect(screen.queryByText('Output')).not.toBeInTheDocument()
    })
  })
})
