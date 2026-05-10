const PORT = 3000

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url)

    // Health check
    if (url.pathname === '/api/health') {
      return Response.json({ status: 'ok', timestamp: Date.now() })
    }

    // API routes placeholder
    if (url.pathname.startsWith('/api/')) {
      return Response.json(
        { error: 'Not implemented' },
        { status: 501 },
      )
    }

    return new Response('Not Found', { status: 404 })
  },
})

console.log(`🚀 Backend running at http://localhost:${server.port}`)
