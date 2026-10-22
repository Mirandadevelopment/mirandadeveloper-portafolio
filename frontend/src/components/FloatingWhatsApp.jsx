import { useEffect, useState } from 'react'
import { site } from '../config/site.js'

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000)
    return () => clearTimeout(t)
  }, [])

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    'Olá Allan! Vim pelo site mirandadeveloper e quero falar sobre um projeto.',
  )}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-neon-cyan px-4 py-3 font-semibold text-night-950 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      } ${pulse ? 'animate-pulse' : ''}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3 0-.1-.2-.2-.5-.3z" />
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3A9.9 9.9 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 0 1 3.8 12c0-4.5 3.7-8.2 8.2-8.2S20.2 7.5 20.2 12s-3.7 8.2-8.2 8.2z" />
      </svg>
      <span className="hidden text-sm sm:inline">WhatsApp</span>
    </a>
  )
}
