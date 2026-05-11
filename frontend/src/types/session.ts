export type SessionStatus = 'pending' | 'in_progress' | 'completed' | 'failed'
export type MessageRole = 'human' | 'agent'

export type ToolKind =
  | 'read'
  | 'edit'
  | 'delete'
  | 'move'
  | 'search'
  | 'execute'
  | 'think'
  | 'fetch'
  | 'switch_mode'
  | 'other'

export type ToolStatus = 'pending' | 'in_progress' | 'completed' | 'failed'

export interface ToolCallData {
  toolCallId: string
  kind: ToolKind
  title: string
  status: ToolStatus
  content?: Array<{ type: 'diff' | 'terminal' | 'content'; text: string }>
  rawInput?: string
  rawOutput?: string
}

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  toolCalls?: ToolCallData[]
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
