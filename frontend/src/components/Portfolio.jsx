import { useState } from 'react'
import { site } from '../config/site.js'
import LikeDislike from './LikeDislike.jsx'

const categories = ['Todos', 'Operações', 'Automação', 'Sistemas']

const projects = [
  {
    id: 1,
    title: 'Gestão de Almoxarifado e Compras Técnicas',
    category: 'Operações',
    repo: 'https://github.com/Mirandadevelopment',
    gradient: 'from-neon-purple to-neon-blue',
    description:
      'Estruturação de controle de estoque, fluxo de entrada/saída e compras de insumos para operação contínua de marcenaria técnica.',
    tags: ['Estoque', 'Compras', 'Almoxarifado', 'Logística'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10l9 4 9-4V7" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Automação de Servidores e Bots',
    category: 'Automação',
    repo: 'https://github.com/Mirandadevelopment/discord-bot-professional-v3',
    gradient: 'from-neon-cyan to-neon-purple',
    description:
      'Bots de alta performance em Node.js e Python para gestão de fluxos operacionais, integrações e suporte a equipes em tempo real.',
    tags: ['Node.js', 'Python', 'APIs', 'Bots'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.4-3 8-7 9-4-1-7-4.6-7-9V7l7-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Modelagem SQL para Operação em Tempo Real',
    category: 'Sistemas',
    repo: 'https://github.com/Mirandadevelopment',
    gradient: 'from-neon-blue to-neon-cyan',
    description:
      'Modelagem e otimização de bancos SQL para sistemas com alta disponibilidade, rastreabilidade e estabilidade de dados.',
    tags: ['SQL', 'Modelagem', 'Disponibilidade', 'Dados'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Logística de Materiais Críticos (Petrobras)',
    category: 'Operações',
    gradient: 'from-emerald-400 to-neon-cyan',
    description:
      'Fabricação de embalagens sob medida e suporte logístico para transporte seguro de materiais críticos para plataformas.',
    tags: ['Petrobras', 'Embalagens', 'Campo', 'Segurança'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V9l7-5 7 5v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Scripts para Economia e Inventário (FiveM)',
    category: 'Sistemas',
    repo: 'https://github.com/Mirandadevelopment/complexodamare.fivem-hypnonema',
    gradient: 'from-neon-cyan to-emerald-400',
    description:
      'Criação de scripts complexos em Lua para frameworks QBcore e Creative, focados em economia, inventário e estabilidade.',
    tags: ['Lua', 'QBcore', 'Creative', 'Inventário'],
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
    title: 'Diagnóstico de Infraestrutura e Recuperação de Dados',
    category: 'Automação',
    repo: 'https://github.com/Mirandadevelopment',
    gradient: 'from-neon-purple to-fuchsia-500',
    description:
      'Consultoria técnica para identificação de falhas operacionais, continuidade de serviços e recuperação de dados críticos.',
    tags: ['Infraestrutura', 'Consultoria', 'Recuperação', 'Suporte'],
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
            Entregas em <span className="text-gradient">Destaque</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Casos reais em operação, logística, automação e sistemas para ambientes de alta exigência.
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
                    Ver referência
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
