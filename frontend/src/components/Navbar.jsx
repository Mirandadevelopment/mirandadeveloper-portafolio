import { useEffect, useState } from 'react'

const links = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Contato', href: '#contato' },
]

const desktopLinks = links.filter((l) => l.href !== '#contato')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight / 3
      let current = '#inicio'
      for (const section of sections) {
        if (section.offsetTop <= probe) current = `#${section.id}`
      }
      if (current !== active) setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [active])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="font-display text-lg font-bold tracking-widest text-white" aria-label="Allan Miranda — início">
          ALLAN<span className="text-gradient">.DEV</span>
        </a>

        <ul className="hidden items-center gap-4 xl:flex">
          {desktopLinks.map((l) => {
            const isActive = active === l.href
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative text-sm font-medium transition-colors ${
                    isActive ? 'text-neon-cyan' : 'text-slate-300 hover:text-neon-cyan'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href="#servicos"
          className="hidden rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-2.5 text-sm font-semibold text-night-950 transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-night-950 lg:inline-flex"
        >
          Orçamento
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          <span className={`h-0.5 w-6 bg-neon-cyan transition-all ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-neon-cyan transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-neon-cyan transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <div id="menu-mobile" className="glass border-t border-neon-cyan/10 px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.href ? 'true' : undefined}
                  className={`block text-sm font-medium transition-colors hover:text-neon-cyan ${
                    active === l.href ? 'text-neon-cyan' : 'text-slate-200'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
