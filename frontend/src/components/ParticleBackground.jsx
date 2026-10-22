import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useInView.js'

export default function ParticleBackground({ density = 0.0001 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let particles = []
    let raf = null

    // Matrix green + teal + soft indigo
    const colors = ['57,255,20', '45,212,191', '56,189,248']
    const reduced = prefersReducedMotion()
    const isCoarse = window.matchMedia('(pointer: coarse)').matches

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      const factor = isCoarse ? 0.45 : 1
      const count = Math.min(reduced ? 0 : 120, Math.floor(width * height * density * factor))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.5,
        c: colors[Math.floor(Math.random() * colors.length)],
      }))
      if (reduced) drawStatic()
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},0.7)`
        ctx.fill()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const linkDist = 120

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},0.75)`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.4
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${p.c},${alpha})`
            ctx.lineWidth = 0.55
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    if (!reduced) draw()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full opacity-45"
      aria-hidden="true"
    />
  )
}
