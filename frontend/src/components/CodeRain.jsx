import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useInView.js'

const GLYPHS = '01<>/{}[]=;:?$#@()!&|+-*λΔΩΣπ<>01LUA'.split('')

export default function CodeRain({ className = '', speed = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    if (!canvas || !parent) return undefined
    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()
    let raf = null
    let width = 0
    let height = 0
    let fontSize = 14
    let cols = 0
    let drops = []

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      width = canvas.width = rect.width
      height = canvas.height = rect.height
      fontSize = 14
      cols = Math.max(1, Math.ceil(width / fontSize))
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -25))
    }

    const drawFrame = () => {
      ctx.fillStyle = 'rgba(5,5,15,0.12)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px "Space Grotesk", monospace`
      for (let i = 0; i < cols; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillStyle = Math.random() > 0.975 ? '#00d4ff' : 'rgba(0,212,255,0.55)'
        ctx.fillText(char, x, y)
        if (y > height && Math.random() > 0.975) drops[i] = 0
        drops[i] += 0.5 * speed
      }
      raf = requestAnimationFrame(drawFrame)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${fontSize}px "Space Grotesk", monospace`
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < Math.floor(height / fontSize); j++) {
          const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          ctx.fillStyle = Math.random() > 0.92 ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.12)'
          ctx.fillText(char, i * fontSize, j * fontSize + fontSize)
        }
      }
    }

    resize()
    if (reduced) drawStatic()
    else drawFrame()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-40 ${className}`}
      aria-hidden="true"
    />
  )
}
