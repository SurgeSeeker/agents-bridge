import type { Session, SessionStatus } from '@/types/session'
import { Button } from '@/components/ui/button'

interface SessionHeaderProps {
  session: Session
  projectName: string
  onPause: () => void
  onSendCommand: () => void
}

const statusLabels: Record<SessionStatus, string> = {
  in_progress: '运行中',
  pending: '等待中',
  completed: '已完成',
  failed: '已失败',
}

const statusColors: Record<SessionStatus, string> = {
  in_progress: '#22c55e',
  pending: '#f59e0b',
  completed: '#9ca3af',
  failed: '#ef4444',
}

export default function SessionHeader({ session, projectName, onPause, onSendCommand }: SessionHeaderProps) {
  return (
    <div className="border-b px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="inline-block rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {projectName}
          </span>
          <h2 className="text-base font-semibold leading-tight">{session.name}</h2>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="h-2 w-2 rounded-full inline-block"
              style={{ backgroundColor: statusColors[session.status] }}
            />
            {statusLabels[session.status]}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onPause}>
            暂停
          </Button>
          <Button
            size="sm"
            style={{ backgroundColor: '#3388BB' }}
            className="text-white hover:opacity-90"
            onClick={onSendCommand}
          >
            发送指令
          </Button>
        </div>
      </div>
    </div>
  )
}
