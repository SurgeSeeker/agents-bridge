import { render, screen } from '@testing-library/react'
import Dashboard from '@/pages/Dashboard'

describe('Dashboard', () => {
  // Scenario 1: Render welcome page heading and instruction text
  it('renders the welcome heading and instruction text', () => {
    render(<Dashboard />)

    expect(screen.getByText('agents-bridge')).toBeInTheDocument()
    expect(screen.getByText('从左侧选择一个会话开始')).toBeInTheDocument()
  })

  // Scenario 2: Render MessageSquare icon
  it('renders the MessageSquare icon', () => {
    const { container } = render(<Dashboard />)

    const icon = container.querySelector('.lucide-message-square')
    expect(icon).toBeInTheDocument()
  })
})
