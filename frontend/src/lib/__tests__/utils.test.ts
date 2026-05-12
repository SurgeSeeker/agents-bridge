import { cn } from '@/lib/utils'

describe('cn', () => {
  it('should merge multiple class strings and filter out falsy values', () => {
    const result = cn('px-4', 'py-2', null, undefined, false, 'bg-red-500')
    expect(result).toContain('px-4')
    expect(result).toContain('py-2')
    expect(result).toContain('bg-red-500')
    // falsy values should not appear
    expect(result).not.toContain('null')
    expect(result).not.toContain('undefined')
    expect(result).not.toContain('false')
  })

  it('should resolve Tailwind class conflicts using twMerge', () => {
    // When two conflicting Tailwind classes are passed, only the last one should remain
    const result = cn('px-4', 'px-2')
    expect(result).toBe('px-2')
    expect(result).not.toContain('px-4')
  })
})
