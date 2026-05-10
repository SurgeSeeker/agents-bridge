import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Activity, Terminal, Monitor, Zap } from 'lucide-react'

export default function Dashboard() {
  const features = [
    {
      icon: Activity,
      title: 'Visual Orchestration',
      desc: 'Drag-and-drop agent pipeline builder with real-time execution visualization.',
    },
    {
      icon: Terminal,
      title: 'CLI Native',
      desc: 'Full-featured terminal interface for power users. Scriptable and pipe-friendly.',
    },
    {
      icon: Monitor,
      title: 'Desktop App',
      desc: 'Native desktop experience with system tray, notifications, and offline support.',
    },
    {
      icon: Zap,
      title: 'ACP Interop',
      desc: 'Native ACP protocol support — connect any ACP-compatible agent seamlessly.',
    },
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl font-bold tracking-tight">Agents Bridge</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Visual orchestration · ACP-native interoperability · CLI / Desktop / Web —{' '}
          <span className="font-medium" style={{ color: '#3388BB' }}>
            redefining the agent management experience
          </span>
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Input
            className="max-w-xs"
            placeholder="Add agent endpoint..."
          />
          <Button style={{ backgroundColor: '#3388BB' }}>Connect</Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card key={f.title} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <f.icon className="h-8 w-8 mb-1" style={{ color: '#3388BB' }} />
              <CardTitle className="text-base">{f.title}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: '#3388BB' }}
              />
              <span
                className="relative inline-flex h-3 w-3 rounded-full"
                style={{ backgroundColor: '#3388BB' }}
              />
            </span>
            <span className="text-sm text-muted-foreground">Backend running — ready to accept connections</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
