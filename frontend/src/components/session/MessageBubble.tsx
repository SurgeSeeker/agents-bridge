import type { Message } from '@/types/session'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isHermes = message.role === 'hermes'

  return (
    <div className={`flex gap-2 ${isHermes ? '' : 'ml-auto flex-row-reverse'}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          isHermes
            ? 'bg-[#e8f4fd] text-[#3388BB]'
            : 'bg-[#fef3c7] text-[#d97706]'
        }`}
      >
        {isHermes ? 'H' : 'CC'}
      </div>
      <div className="max-w-[70%] space-y-1">
        <div
          className={`rounded-lg px-3 py-2 text-sm ${
            isHermes ? 'bg-[#f0f4f8] text-foreground' : 'bg-[#e8f4fd] text-foreground'
          }`}
        >
          {message.content}
        </div>
        <p className="text-xs text-muted-foreground px-1">
          {new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}
