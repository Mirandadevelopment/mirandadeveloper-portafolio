import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useInView.js'

/* Estilo Matrix: katakana + binário + símbolos de código */
const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>{}[]/=;:#@$&|+-*λΔΩΣπ'.split('')

export default function CodeRain({ className = '', speed = 1, opacity = 0.55, global = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const parent = global ? null : canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()
    let raf = null
    let width = 0
    let height = 0
    let fontSize = 15
    let cols = 0
    let drops = []
    let trails = []

    const resize = () => {
      if (global) {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      } else if (parent) {
        const rect = parent.getBoundingClientRect()
        width = canvas.width = rect.width
        height = canvas.height = rect.height
      }
      fontSize = window.innerWidth < 640 ? 13 : 15
      cols = Math.max(1, Math.ceil(width / fontSize))
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -40))
      trails = Array.from({ length: cols }, () => 8 + Math.floor(Math.random() * 16))
    }

    const drawFrame = () => {
      // Rastro escuro (efeito “desintegração”)
      ctx.fillStyle = 'rgba(11, 18, 32, 0.08)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px "Courier New", ui-monospace, monospace`

      for (let i = 0; i < cols; i++) {
        const x = i * fontSize
        const headY = drops[i] * fontSize
        const trailLen = trails[i]

        for (let t = 0; t < trailLen; t++) {
          const y = headY - t * fontSize
          if (y < 0 || y > height) continue
          const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          const fade = 1 - t / trailLen

          if (t === 0) {
            // Cabeça brilhante (branco-verde Matrix)
            ctx.fillStyle = `rgba(220, 255, 230, ${0.95 * opacity})`
            ctx.shadowColor = 'rgba(57, 255, 20, 0.8)'
            ctx.shadowBlur = 8
          } else if (t < 3) {
            ctx.fillStyle = `rgba(57, 255, 20, ${0.85 * fade * opacity})`
            ctx.shadowBlur = 0
          } else {
            ctx.fillStyle = `rgba(0, 180, 80, ${0.55 * fade * opacity})`
            ctx.shadowBlur = 0
          }
          ctx.fillText(char, x, y)
        }

        ctx.shadowBlur = 0

        if (headY > height && Math.random() > 0.975) {
          drops[i] = 0
          trails[i] = 8 + Math.floor(Math.random() * 16)
        }
        drops[i] += (0.35 + Math.random() * 0.25) * speed
      }

      raf = requestAnimationFrame(drawFrame)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${fontSize}px "Courier New", ui-monospace, monospace`
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < Math.floor(height / fontSize); j++) {
          if (Math.random() > 0.88) continue
          const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          ctx.fillStyle =
            Math.random() > 0.9
              ? `rgba(180, 255, 200, ${0.35 * opacity})`
              : `rgba(0, 180, 80, ${0.12 * opacity})`
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
  }, [speed, opacity, global])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${global ? 'fixed inset-0 z-[1]' : 'absolute inset-0 h-full w-full'} ${className}`}
      style={global ? { opacity } : undefined}
      aria-hidden="true"
    />
  )
}
