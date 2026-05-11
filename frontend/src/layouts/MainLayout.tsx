import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { mockProjects } from '@/lib/mock-data'
import type { Project, Session } from '@/types/session'
import Sidebar from '@/components/sidebar/Sidebar'
import SessionView from '@/components/session/SessionView'

export function MainLayout() {
  const [projects] = useState<Project[]>(mockProjects)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [selectedProjectName, setSelectedProjectName] = useState('')

  const activeSession: Session | null = (() => {
    if (!activeSessionId) return null
    for (const p of projects) {
      const s = p.sessions.find((s) => s.id === activeSessionId)
      if (s) return s
    }
    return null
  })()

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId)
    const project = projects.find((p) => p.sessions.some((s) => s.id === sessionId))
    setSelectedProjectName(project?.name ?? '')
  }

  return (
    <div className="h-screen flex">
      <Sidebar
        projects={projects}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onAddClick={() => console.log('add session')}
      />
      <main className="flex-1 flex flex-col min-w-0">
        {activeSession ? (
          <SessionView session={activeSession} projectName={selectedProjectName} />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}
