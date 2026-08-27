import { site } from '../config/site.js'

const socials = [
  { name: 'GitHub', href: site.social.github, d: 'M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.6-10.9C23.5 5.7 18.3.5 12 .5z' },
  { name: 'LinkedIn', href: site.social.linkedin, d: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14.8H.2V8zM8.3 8h4.4v2h.1c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.3 3 5.3 6.9v8.2h-4.6v-7.3c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8v7.4H8.3V8z' },
  { name: 'Discord', href: site.social.discord, d: 'M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.2a18.3 18.3 0 0 1 5.5 1.7A16 16 0 0 0 12 1.5 16 16 0 0 0 3.7 5.9 18.3 18.3 0 0 1 9.2 4.2L8.6 3a19.8 19.8 0 0 0-4.9 1.4A20.5 20.5 0 0 0 .2 18.3a19.9 19.9 0 0 0 6 3l1.3-2a13 13 0 0 1-2.1-1l.5-.4a14.3 14.3 0 0 0 12.2 0l.5.4a13 13 0 0 1-2.1 1l1.3 2a19.9 19.9 0 0 0 6-3 20.4 20.4 0 0 0-3.5-13.9zM8.5 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm7 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z' },
]

const nav = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-night-700 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="font-display font-bold tracking-widest text-white">
            ALLAN<span className="text-gradient">.DEV</span>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-neon-cyan">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-night-700 text-slate-400 transition-all duration-200 hover:border-neon-cyan/50 hover:text-neon-cyan hover:glow-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5" aria-hidden="true">
                    <path d={s.d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-night-800 pt-6 text-center text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.name} — Desenvolvido com disciplina &amp; precisão.</p>
          <a href="#inicio" className="text-neon-cyan transition-colors hover:text-neon-purple">
            voltar ao topo &uarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
