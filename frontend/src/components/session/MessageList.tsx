import type { Message } from '@/types/session'
import { ScrollArea } from '@/components/ui/scroll-area'
import MessageBubble from './MessageBubble'

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 px-4 py-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
    </ScrollArea>
  )
}
