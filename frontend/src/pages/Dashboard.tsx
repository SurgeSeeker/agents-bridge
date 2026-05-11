import { MessageSquare } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold" style={{ color: '#3388BB' }}>
          agents-bridge
        </h1>
        <p className="text-sm text-muted-foreground">从左侧选择一个会话开始</p>
        <div className="pt-4 flex justify-center">
          <MessageSquare className="h-8 w-8 text-muted-foreground/30" />
        </div>
      </div>
    </div>
  )
}
