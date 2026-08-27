import { useEffect } from 'react'
import { prefersReducedMotion } from '../hooks/useInView.js'

const COLORS = ['#00d4ff', '#a855f7', '#3b82f6', '#e2e8f0']

export default function ClickBurst() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const spawn = (e) => {
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('span')
        const angle = Math.random() * Math.PI * 2
        const dist = 24 + Math.random() * 56
        const size = 3 + Math.random() * 4
        const color = COLORS[i % COLORS.length]
        p.setAttribute('aria-hidden', 'true')
        p.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;border-radius:9999px;background:${color};box-shadow:0 0 8px ${color};pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:1;transition:transform .65s cubic-bezier(.22,.61,.36,1),opacity .65s ease;`
        document.body.appendChild(p)
        requestAnimationFrame(() => {
          p.style.transform = `translate(calc(${Math.cos(angle) * dist}px - 50%), calc(${Math.sin(angle) * dist}px - 50%)) scale(0)`
          p.style.opacity = '0'
        })
        window.setTimeout(() => p.remove(), 700)
      }
    }

    document.addEventListener('pointerdown', spawn)
    return () => document.removeEventListener('pointerdown', spawn)
  }, [])

  return null
}
