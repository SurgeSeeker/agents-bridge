import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim())
      setText('')
    }
  }

  return (
    <div className="flex items-center gap-2 border-t px-4 py-3">
      <Input
        placeholder="输入消息..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        disabled={disabled}
      />
      <Button
        style={{ backgroundColor: '#3388BB' }}
        className="text-white hover:opacity-90 shrink-0"
        size="sm"
        disabled={disabled || !text.trim()}
        onClick={handleSend}
      >
        发送
      </Button>
    </div>
  )
}
