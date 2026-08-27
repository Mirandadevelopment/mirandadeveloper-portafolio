import { useState } from 'react'
import { site } from '../config/site.js'
import LikeDislike from './LikeDislike.jsx'

const categories = ['Todos', 'FiveM', 'Bots/Automação', 'Full Stack']

const projects = [
  {
    id: 1,
    title: 'Apex Nexus V3',
    category: 'Bots/Automação',
    repo: 'https://github.com/Mirandadevelopment/discord-bot-professional-v3',
    gradient: 'from-neon-purple to-neon-blue',
    description:
      'Bot de alta performance para Discord com sistema de tickets, whitelist automatizada e dashboard de gerenciamento.',
    tags: ['Node.js', 'discord.js', 'Automação', 'Dashboard'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.4-3 8-7 9-4-1-7-4.6-7-9V7l7-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Frameworks & Scripts FiveM',
    category: 'FiveM',
    repo: 'https://github.com/Mirandadevelopment/complexodamare.fivem-hypnonema',
    gradient: 'from-neon-cyan to-neon-purple',
    description:
      'Otimização de servidores com redução drástica de consumo (ms/tick), sistemas customizados de inventário, whitelist e integração web-game.',
    tags: ['Lua', 'vRP', 'Creative', 'MySQL'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v14H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22l3-4 3 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11h3l-1.5 3h3L10 17" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Gestão de Bases · RJ v6 & Capital SP',
    category: 'FiveM',
    gradient: 'from-neon-blue to-neon-cyan',
    description:
      'Administração técnica e otimização de bases de grande porte, garantindo estabilidade, segurança e performance para comunidades ativas.',
    tags: ['Lua', 'Infra', 'Anti-cheat', 'SQL'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V9l7-5 7 5v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Mu Mobile Server (Lab)',
    category: 'Full Stack',
    gradient: 'from-emerald-400 to-neon-cyan',
    description:
      'Ambiente local de testes complexo com SQL Server, gerenciamento de rede e virtualização — simulando uma infraestrutura de produção real.',
    tags: ['SQL Server', 'Windows Server', 'VirtualBox', 'Redes'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8M12 16v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 9h4v3H7z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Sistema de Gestão Integrado',
    category: 'Full Stack',
    gradient: 'from-neon-cyan to-emerald-400',
    description:
      'Plataformas de gestão com autenticação, dashboards em tempo real, relatórios e integração com APIs externas.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Automação & Comunidade Discord',
    category: 'Bots/Automação',
    repo: 'https://github.com/Mirandadevelopment',
    gradient: 'from-neon-purple to-fuchsia-500',
    description:
      'Bots de alta complexidade com verificação automática, sistema de níveis, integração com APIs de jogos e moderação eficiente.',
    tags: ['discord.js', 'Node.js', 'APIs', 'Moderação'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 9l-2 3 2 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l2 3-2 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17l-2 4M15 17l2 4M14 7l-4 10" />
      </svg>
    ),
  },
]

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.6-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('Todos')
  const visible = filter === 'Todos' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projetos" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-purple uppercase">Portfólio</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Projetos em <span className="text-gradient">Destaque</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Soluções reais em FiveM, automação e sistemas web. Clique no card para ver o código e curta os seus favoritos.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-neon-cyan ${
                filter === c
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-night-950 shadow-lg shadow-neon-purple/30'
                  : 'glass text-slate-300 hover:text-neon-cyan hover:glow-cyan'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div key={filter} data-reveal-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article
              key={p.id}
              data-reveal-child
              className="portfolio-card glass neon-border group relative flex flex-col overflow-hidden rounded-2xl"
            >
              <a
                href={p.repo || site.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ver ${p.title} no GitHub`}
                className="flex flex-1 flex-col focus-visible:outline-none"
              >
                <div
                  className={`portfolio-card-art flex h-40 items-center justify-center bg-gradient-to-br ${p.gradient} text-white`}
                >
                  {p.icon}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-neon-purple/15 px-3 py-1 text-xs font-medium text-neon-purple">
                      {p.category}
                    </span>
                    <GithubIcon className="h-5 w-5 text-slate-500 transition-colors group-hover:text-neon-cyan" />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold text-white transition-colors group-hover:text-neon-cyan">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-neon-cyan/20 bg-night-800 px-2 py-0.5 font-mono text-xs text-neon-cyan"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan transition-transform duration-300 group-hover:translate-x-1">
                    Ver código
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-between border-t border-night-800 bg-night-900/30 px-6 py-3">
                <LikeDislike id={`proj-${p.id}`} />
                <span className="font-mono text-[10px] text-slate-600">{p.category.split('/')[0]}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
