import type { Project } from '@/types/session'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import ProjectGroup from './ProjectGroup'

interface SidebarProps {
  projects: Project[]
  activeSessionId: string | null
  onSelectSession: (sessionId: string) => void
  onAddClick: () => void
}

export default function Sidebar({ projects, activeSessionId, onSelectSession, onAddClick }: SidebarProps) {
  return (
    <aside className="w-60 border-r bg-background flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-sm font-semibold">📁 工作区</span>
        <Button
          size="icon-xs"
          style={{ backgroundColor: '#3388BB' }}
          className="text-white hover:opacity-90"
          onClick={onAddClick}
        >
          +
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="py-1">
          {projects.map((project) => (
            <ProjectGroup
              key={project.id}
              project={project}
              activeSessionId={activeSessionId}
              onSelectSession={onSelectSession}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
