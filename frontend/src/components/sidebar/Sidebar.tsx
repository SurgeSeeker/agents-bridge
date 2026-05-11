import type { Project } from '@/types/session'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Folder, Plus } from 'lucide-react'
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
        <span className="text-sm font-semibold">
          <Folder className="mr-1.5 inline h-4 w-4" />
          工作区
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 rounded-md hover:bg-gray-100"
          onClick={onAddClick}
        >
          <Plus className="h-4 w-4" />
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
