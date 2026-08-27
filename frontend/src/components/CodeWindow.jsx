import { useEffect, useState } from 'react'
import { useInView, prefersReducedMotion } from '../hooks/useInView.js'

export default function CodeWindow({ lines, title = 'terminal', className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.25 })
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    if (prefersReducedMotion()) {
      setVisible(lines.length)
      return undefined
    }
    setVisible(0)
    let i = 0
    const iv = setInterval(() => {
      i += 1
      setVisible(i)
      if (i >= lines.length) clearInterval(iv)
    }, 260)
    return () => clearInterval(iv)
  }, [inView, lines.length])

  return (
    <div ref={ref} className={`glass neon-border overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-2 border-b border-night-700 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate font-mono text-xs text-slate-500">{title}</span>
        <span className="ml-auto font-mono text-[10px] text-slate-600">zsh</span>
      </div>
      <div className="h-[300px] overflow-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.map((line, i) => (
          <div key={i} className="flex whitespace-pre">
            <span className="mr-3 w-6 shrink-0 text-right text-slate-700 select-none">{i + 1}</span>
            {i < visible ? (
              <span className={line.color || 'text-slate-300'}>{line.text}</span>
            ) : (
              <span className="text-slate-700">&nbsp;</span>
            )}
            {i === visible - 1 && <span className="typing-caret" />}
          </div>
        ))}
      </div>
    </div>
  )
}
