import type { Project } from '../types/session'

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Retrace',
    icon: '🔄',
    sessions: [
      {
        id: 'session-1',
        name: '修复数据库连接池泄漏',
        status: 'running',
        branch: 'fix/db-pool-leak',
        projectId: 'proj-1',
        lastActivity: '2026-05-11T10:30:00Z',
        messages: [
          {
            id: 'msg-1',
            role: 'hermes',
            content: '分析一下 database pool 的使用情况，看看有没有连接泄漏的迹象。',
            timestamp: '2026-05-11T10:00:00Z',
          },
          {
            id: 'msg-2',
            role: 'claude',
            content: '已扫描所有 DataSource 使用点，发现 `OrderService.java:156` 处使用了 try-with-resources 但 catch 块中没有正确释放连接。此外 `ReportGenerator.java:89` 每次调用都新建连接但不归还池中。建议修复这两处后添加连接池监控。',
            timestamp: '2026-05-11T10:02:00Z',
          },
          {
            id: 'msg-3',
            role: 'hermes',
            content: '好的，先把 OrderService 的那处修掉，ReportGenerator 留给你处理。',
            timestamp: '2026-05-11T10:05:00Z',
          },
          {
            id: 'msg-4',
            role: 'claude',
            content: '已修复 ReportGenerator，改用 try-with-resources 确保连接自动归还。同时给 HikariCP 添加了 leakDetectionThreshold=30000 配置。正在运行集成测试……',
            timestamp: '2026-05-11T10:08:00Z',
          },
        ],
      },
      {
        id: 'session-2',
        name: '重构用户认证模块',
        status: 'waiting',
        branch: 'refactor/auth',
        projectId: 'proj-1',
        lastActivity: '2026-05-11T09:00:00Z',
        messages: [
          {
            id: 'msg-5',
            role: 'hermes',
            content: '认证模块现在有 3 种不同的实现，能不能统一成一个？',
            timestamp: '2026-05-11T08:30:00Z',
          },
          {
            id: 'msg-6',
            role: 'claude',
            content: '可以。我建议采用策略模式（Strategy Pattern），把 JWT、OAuth2、Session 三种认证方式抽象成统一的 AuthProvider 接口。现有代码中 80% 的逻辑可以复用，预计改动量约 400 行。要开始做吗？',
            timestamp: '2026-05-11T08:32:00Z',
          },
        ],
      },
      {
        id: 'session-3',
        name: 'API 响应时间优化',
        status: 'completed',
        branch: 'perf/api-optimize',
        projectId: 'proj-1',
        lastActivity: '2026-05-10T18:00:00Z',
        messages: [
          {
            id: 'msg-7',
            role: 'hermes',
            content: '/api/products 接口响应时间超过 2s，需要优化。',
            timestamp: '2026-05-10T16:00:00Z',
          },
          {
            id: 'msg-8',
            role: 'claude',
            content: '分析完成：主要瓶颈是 N+1 查询问题，`ProductRepository.findAll()` 之后逐条查询 Category 和 Supplier。已添加 `@EntityGraph` 批量加载关联实体，预计可降至 300ms 以内。',
            timestamp: '2026-05-10T16:05:00Z',
          },
          {
            id: 'msg-9',
            role: 'hermes',
            content: '验证通过，响应时间降到 280ms。PR 已合并，关闭这个会话。',
            timestamp: '2026-05-10T18:00:00Z',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-2',
    name: 'agents-bridge',
    icon: '🌉',
    sessions: [],
  },
  {
    id: 'proj-3',
    name: 'blog-source',
    icon: '📝',
    sessions: [
      {
        id: 'session-4',
        name: '迁移到 Astro 5',
        status: 'completed',
        branch: 'chore/astro5',
        projectId: 'proj-3',
        lastActivity: '2026-05-09T15:00:00Z',
        messages: [
          {
            id: 'msg-10',
            role: 'hermes',
            content: 'Astro 5 发布了，评估一下迁移成本。',
            timestamp: '2026-05-09T14:00:00Z',
          },
          {
            id: 'msg-11',
            role: 'claude',
            content: '主要变更：1) Content Collections API 重写为 Content Layer；2) 新的图片优化 API 替代旧方式；3) 部分 Vite 插件配置需要更新。影响范围：约 15 个文件。建议分三步迁移。',
            timestamp: '2026-05-09T14:03:00Z',
          },
          {
            id: 'msg-12',
            role: 'hermes',
            content: '全部迁移完毕，构建通过。发布一篇迁移总结博客吧。',
            timestamp: '2026-05-09T15:00:00Z',
          },
        ],
      },
    ],
  },
]
