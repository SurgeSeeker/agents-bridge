import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FileSearch,
  FilePenLine,
  Trash2,
  Move,
  Search,
  Terminal,
  Brain,
  Globe,
  Shuffle,
  Wrench,
  Loader2,
} from 'lucide-react'
import type { ToolCallData, ToolKind, ToolStatus } from '@/types/session'

interface ToolCallItemProps {
  toolCall: ToolCallData
}

const ICON_MAP: Record<ToolKind, typeof Wrench> = {
  read: FileSearch,
  edit: FilePenLine,
  delete: Trash2,
  move: Move,
  search: Search,
  execute: Terminal,
  think: Brain,
  fetch: Globe,
  switch_mode: Shuffle,
  other: Wrench,
}

function StatusIndicator({ status }: { status: ToolStatus }) {
  switch (status) {
    case 'pending':
      return <span className="block h-1.5 w-1.5 rounded-full bg-gray-300 opacity-60" />
    case 'in_progress':
      return (
        <motion.span
          className="flex text-[#3388BB]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <Loader2 className="h-3 w-3" />
        </motion.span>
      )
    case 'completed':
      return <span className="text-green-500 text-xs leading-none">&#x2713;</span>
    case 'failed':
      return <span className="text-red-500 text-xs leading-none">&#x2717;</span>
  }
}

function ContentBlock({ items }: { items: NonNullable<ToolCallData['content']> }) {
  return (
    <>
      {items.map((block, i) => {
        if (block.type === 'terminal') {
          return (
            <div key={i} className="space-y-0">
              {block.text.split('\n').map((line, j) => (
                <div key={j} className="whitespace-pre-wrap break-all">
                  <span className="text-gray-500">$ </span>
                  {line}
                </div>
              ))}
            </div>
          )
        }
        if (block.type === 'diff') {
          return (
            <div key={i} className="space-y-0">
              {block.text.split('\n').map((line, j) => {
                if (line.startsWith('+')) {
                  return (
                    <div key={j} className="text-green-400 whitespace-pre-wrap break-all">
                      +{line.slice(1)}
                    </div>
                  )
                }
                if (line.startsWith('-')) {
                  return (
                    <div key={j} className="text-red-400 whitespace-pre-wrap break-all">
                      -{line.slice(1)}
                    </div>
                  )
                }
                return (
                  <div key={j} className="whitespace-pre-wrap break-all">
                    {line}
                  </div>
                )
              })}
            </div>
          )
        }
        return (
          <div key={i} className="whitespace-pre-wrap break-all">
            {block.text}
          </div>
        )
      })}
    </>
  )
}

export default function ToolCallItem({ toolCall }: ToolCallItemProps) {
  const [expanded, setExpanded] = useState(false)
  const IconComponent = ICON_MAP[toolCall.kind] ?? Wrench

  return (
    <div className="py-0.5">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 text-left transition-colors hover:bg-gray-50"
      >
        <IconComponent className="h-3.5 w-3.5 shrink-0 text-gray-500" />
        <span className="flex-1 truncate text-sm text-gray-600">{toolCall.title}</span>
        <StatusIndicator status={toolCall.status} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-1 max-h-60 space-y-2 overflow-auto rounded-lg bg-gray-900 p-3 font-mono text-xs text-gray-100">
              {toolCall.rawInput && (
                <>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400">Input</div>
                  <div className="whitespace-pre-wrap break-all">{toolCall.rawInput}</div>
                </>
              )}
              {toolCall.content && toolCall.content.length > 0 && (
                <>
                  {toolCall.rawInput && <div className="border-t border-gray-700" />}
                  <ContentBlock items={toolCall.content} />
                </>
              )}
              {toolCall.rawOutput && (
                <>
                  {(toolCall.rawInput || (toolCall.content && toolCall.content.length > 0)) && (
                    <div className="border-t border-gray-700" />
                  )}
                  <div className="text-[10px] uppercase tracking-wider text-gray-400">Output</div>
                  <div className="whitespace-pre-wrap break-all">{toolCall.rawOutput}</div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
