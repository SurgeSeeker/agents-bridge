import type { Message } from '@/types/session'
import ToolCallItem from './ToolCallItem'

interface MessageBubbleProps {
  message: Message
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isHuman = message.role === 'human'

  if (isHuman) {
    return (
      <div className="ml-auto max-w-[80%]">
        <div className="flex gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f4fd] text-xs font-bold text-[#3388BB]">
            H
          </div>
          <div className="flex-1 space-y-1">
            <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-sm">
              <p className="text-[15px] leading-relaxed">{message.content}</p>
            </div>
            <p className="px-1 text-xs text-gray-400">
              {formatTime(message.timestamp)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Agent message
  return (
    <div className="w-full">
      <p className="text-[15px] leading-relaxed text-gray-800">{message.content}</p>

      {message.toolCalls && message.toolCalls.length > 0 && (
        <div className="mt-3 flex flex-col gap-1 border-l-2 border-gray-200 pl-3">
          {message.toolCalls.map((tc) => (
            <ToolCallItem key={tc.toolCallId} toolCall={tc} />
          ))}
        </div>
      )}

      <p className="mt-1 text-xs text-gray-400">
        {formatTime(message.timestamp)}
      </p>
    </div>
  )
}
