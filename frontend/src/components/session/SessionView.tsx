import type { Session } from '@/types/session'
import SessionHeader from './SessionHeader'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

interface SessionViewProps {
  session: Session
  projectName: string
}

export default function SessionView({ session, projectName }: SessionViewProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      <SessionHeader
        session={session}
        projectName={projectName}
        onPause={() => console.log('pause', session.id)}
        onSendCommand={() => console.log('send command', session.id)}
      />
      <MessageList messages={session.messages} />
      <ChatInput onSend={(text) => console.log('send', text)} />
    </div>
  )
}
