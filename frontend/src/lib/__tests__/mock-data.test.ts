import { mockProjects } from '@/lib/mock-data'
import type { Project, Session, Message } from '@/types/session'

describe('mockProjects', () => {
  it('should be a non-empty array of Project type', () => {
    expect(Array.isArray(mockProjects)).toBe(true)
    expect(mockProjects.length).toBeGreaterThan(0)

    mockProjects.forEach((project: Project) => {
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('name')
      expect(project).toHaveProperty('icon')
      expect(project).toHaveProperty('sessions')
      expect(typeof project.id).toBe('string')
      expect(typeof project.name).toBe('string')
      expect(typeof project.icon).toBe('string')
      expect(Array.isArray(project.sessions)).toBe(true)
    })
  })

  it('should have valid session fields in each project', () => {
    mockProjects.forEach((project: Project) => {
      project.sessions.forEach((session: Session) => {
        expect(session).toHaveProperty('id')
        expect(session).toHaveProperty('name')
        expect(session).toHaveProperty('status')
        expect(session).toHaveProperty('branch')
        expect(session).toHaveProperty('messages')

        expect(typeof session.id).toBe('string')
        expect(typeof session.name).toBe('string')
        expect(typeof session.branch).toBe('string')
        expect(typeof session.lastActivity).toBe('string')
        expect(['pending', 'in_progress', 'completed', 'failed']).toContain(
          session.status
        )
        expect(Array.isArray(session.messages)).toBe(true)
      })
    })
  })

  it('should have valid message fields in each session', () => {
    mockProjects.forEach((project: Project) => {
      project.sessions.forEach((session: Session) => {
        session.messages.forEach((message: Message) => {
          expect(message).toHaveProperty('id')
          expect(message).toHaveProperty('role')
          expect(message).toHaveProperty('content')

          expect(typeof message.id).toBe('string')
          expect(typeof message.content).toBe('string')
          expect(['human', 'agent']).toContain(message.role)
        })
      })
    })
  })
})
