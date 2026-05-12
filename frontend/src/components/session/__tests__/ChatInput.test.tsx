import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatInput from '@/components/session/ChatInput'

describe('ChatInput', () => {
  // Scenario 1: Render input and button
  it('renders input with placeholder and send button', () => {
    render(<ChatInput onSend={() => {}} />)

    expect(screen.getByPlaceholderText('输入消息...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '发送' })).toBeInTheDocument()
  })

  // Scenario 2: Type text updates input value
  it('updates input value when user types', async () => {
    const user = userEvent.setup()
    render(<ChatInput onSend={() => {}} />)

    const input = screen.getByPlaceholderText('输入消息...')
    await user.type(input, 'hello')

    expect(input).toHaveValue('hello')
  })

  // Scenario 3: Click send calls onSend and clears input
  it('calls onSend with trimmed text and clears input on send', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)

    const input = screen.getByPlaceholderText('输入消息...')
    await user.type(input, 'hello')
    await user.click(screen.getByRole('button', { name: '发送' }))

    expect(onSend).toHaveBeenCalledTimes(1)
    expect(onSend).toHaveBeenCalledWith('hello')
    expect(input).toHaveValue('')
  })
})
