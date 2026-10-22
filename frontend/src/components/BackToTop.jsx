import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#inicio"
      aria-label="Voltar ao topo"
      className={`neon-border fixed right-5 bottom-20 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-night-800/80 text-neon-cyan backdrop-blur transition-all duration-300 hover:bg-neon-cyan/10 focus-visible:ring-2 focus-visible:ring-neon-cyan sm:bottom-24 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  )
}
