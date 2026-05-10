# Agents Bridge

可视化编排、ACP 原生互通、CLI/桌面/Web 三端合一重新定义 Agent 控制体验

Visual orchestration, native ACP interoperability, and CLI/Desktop/Web tri‑terminal integration redefine the agent management experience.

---

## 概述 | Overview

Agents Bridge 是一个前后端一体的 Agent 管理平台，提供三大核心能力：

1. **可视化编排** — 拖拽式 Agent 流水线构建器，实时执行可视化
2. **ACP 原生互通** — 原生 ACP 协议支持，无缝对接任何 ACP 兼容 Agent
3. **三端合一** — CLI 命令行、桌面应用、Web 界面，统一控制体验

Agents Bridge is a full‑stack agent management platform with three core capabilities:

1. **Visual Orchestration** — Drag‑and‑drop agent pipeline builder with real‑time execution visualization
2. **ACP‑Native Interop** — Native ACP protocol support; connect any ACP‑compatible agent seamlessly
3. **Tri‑Terminal** — CLI, desktop app, and web interface — one unified control experience

## 技术栈 | Tech Stack

| 层 | 技术 |
|---|------|
| Runtime | [Bun](https://bun.sh) |
| Frontend | React 19 + TypeScript + [shadcn/ui](https://ui.shadcn.com) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Backend | Bun HTTP Server |
| Protocol | [ACP (Agent Communication Protocol)](https://github.com/agentcommunicationprotocol) |

主题色 | Theme: `#3388BB`

## 快速开始 | Quick Start

### 前置要求 | Prerequisites

- [Bun](https://bun.sh) >= 1.2

### 安装 | Install

```bash
git clone git@github.com:SurgeSeeker/agents-bridge.git
cd agents-bridge
bun install
```

### 开发 | Development

```bash
# 同时启动前后端 | Start both frontend & backend
bun dev

# 仅前端 | Frontend only
bun dev:frontend    # → http://localhost:5173

# 仅后端 | Backend only
bun dev:backend     # → http://localhost:3000
```

### 构建 | Build

```bash
bun build
```

## 项目结构 | Project Structure

```
agents-bridge/
├── frontend/            # React + Vite + shadcn/ui
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── layouts/     # Page layouts
│   │   ├── lib/         # Utilities
│   │   ├── pages/       # Route pages
│   │   ├── App.tsx      # Root component
│   │   └── main.tsx     # Entry point
│   ├── public/          # Static assets
│   └── package.json
├── backend/             # Bun HTTP server
│   ├── src/
│   │   └── index.ts     # Server entry
│   └── package.json
├── package.json         # Monorepo root (workspaces)
└── bun.lockb
```

## License

[MIT](./LICENSE)
