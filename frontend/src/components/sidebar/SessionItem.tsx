import type { Session } from '@/types/session'

interface SessionItemProps {
  session: Session
  isActive: boolean
  onClick: () => void
}

const statusColors: Record<string, string> = {
  running: '#22c55e',
  waiting: '#f59e0b',
  completed: '#9ca3af',
}

export default function SessionItem({ session, isActive, onClick }: SessionItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors cursor-pointer ${
        isActive
          ? 'bg-[#e8f4fd] text-[#3388BB] border-l-[3px] border-l-[#3388BB]'
          : 'text-muted-foreground hover:bg-muted/50 border-l-[3px] border-l-transparent'
      }`}
    >
      <span
        className="h-2 w-2 rounded-full shrink-0"
        style={{ backgroundColor: statusColors[session.status] }}
      />
      <span className="truncate flex-1">{session.name}</span>
      <span className="text-xs text-muted-foreground shrink-0">
        {session.lastActivity.slice(11, 16)}
      </span>
    </button>
  )
}
