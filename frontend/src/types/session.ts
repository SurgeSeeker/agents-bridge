export type SessionStatus = 'running' | 'waiting' | 'completed'
export type MessageRole = 'hermes' | 'claude'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: string
}

export interface Session {
  id: string
  name: string
  status: SessionStatus
  branch: string
  projectId: string
  messages: Message[]
  lastActivity: string
}

export interface Project {
  id: string
  name: string
  icon: string
  sessions: Session[]
}
