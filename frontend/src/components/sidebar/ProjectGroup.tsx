import { useState } from 'react'
import type { Project } from '@/types/session'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import SessionItem from './SessionItem'

interface ProjectGroupProps {
  project: Project
  activeSessionId: string | null
  onSelectSession: (sessionId: string) => void
}

export default function ProjectGroup({ project, activeSessionId, onSelectSession }: ProjectGroupProps) {
  const [open, setOpen] = useState(true)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-1.5 px-3 py-2 text-sm font-medium cursor-pointer hover:bg-muted/50 transition-colors">
        <span className="text-xs w-4 text-center">{open ? '▾' : '▸'}</span>
        <span>{project.icon}</span>
        <span className="flex-1 truncate text-left">{project.name}</span>
        <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
          {project.sessions.length}
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-0.5 pb-1">
          {project.sessions.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              isActive={session.id === activeSessionId}
              onClick={() => onSelectSession(session.id)}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
