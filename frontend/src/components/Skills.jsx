import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  {
    title: 'Linguagens e core',
    color: 'from-neon-cyan to-neon-blue',
    tip: 'Base sólida para APIs, bots, automações e sistemas web em produção.',
    items: [
      { name: 'JavaScript / Node.js', level: 92 },
      { name: 'Lua (FiveM)', level: 95 },
      { name: 'Python', level: 82 },
      { name: 'TypeScript', level: 85 },
      { name: 'C++ / C#', level: 75 },
      { name: 'SQL / MySQL', level: 86 },
      { name: 'HTML5 / CSS3', level: 88 },
    ],
  },
  {
    title: 'FiveM e frameworks',
    color: 'from-neon-purple to-neon-cyan',
    tip: 'Foco em estabilidade, economia, inventário e performance em bases grandes.',
    items: [
      { name: 'QBcore / Creative', level: 94 },
      { name: 'Otimização (ms/tick)', level: 96 },
      { name: 'Sistemas de inventário', level: 90 },
      { name: 'Economia e jobs', level: 88 },
      { name: 'Whitelist e anti-cheat', level: 87 },
      { name: 'Integração web-game', level: 86 },
    ],
  },
  {
    title: 'Automação e dados',
    color: 'from-neon-blue to-neon-purple',
    tip: 'Bots, APIs e painéis que reduzem trabalho manual e dão visibilidade aos dados.',
    items: [
      { name: 'discord.js / Bots', level: 91 },
      { name: 'APIs REST', level: 89 },
      { name: 'Supabase / Backend', level: 84 },
      { name: 'Power BI / Excel IA', level: 80 },
      { name: 'Automação de fluxos', level: 88 },
    ],
  },
  {
    title: 'Operações e infra',
    color: 'from-emerald-400 to-neon-cyan',
    tip: 'Experiência real em estoque e logística aplicada a sistemas e servidores.',
    items: [
      { name: 'Controle de estoque', level: 93 },
      { name: 'Logística e compras', level: 90 },
      { name: 'Git / GitHub', level: 90 },
      { name: 'Servidores / SQL Server', level: 85 },
      { name: 'AWS (fundamentos)', level: 70 },
    ],
  },
]

function SkillCard({ group, open, onToggle }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <button
      type="button"
      ref={ref}
      data-reveal-child
      onClick={onToggle}
      aria-expanded={open}
      className={`glass neon-border group w-full rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40 ${
        open ? 'ring-1 ring-neon-cyan/50 bg-neon-cyan/5' : ''
      }`}
    >
      <h3 className="font-display flex items-center justify-between gap-2 text-base font-bold text-white">
        <span className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${group.color}`} />
          {group.title}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm transition-transform ${
            open ? 'rotate-45 border-neon-cyan text-neon-cyan' : 'border-slate-600 text-slate-400'
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </h3>

      <div
        className={`grid transition-all duration-300 ${
          open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-slate-400">{group.tip}</p>
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {group.items.map((item, i) => (
          <li key={item.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-200 transition-colors group-hover:text-neon-cyan">
                {item.name}
              </span>
              <span className="font-mono text-xs text-slate-500">{item.level}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-night-700">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${group.color} transition-all duration-1000 ease-out`}
                style={{
                  width: active ? `${item.level}%` : '0%',
                  transitionDelay: `${i * 80}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-[11px] text-slate-500">
        {open ? 'Clique para fechar' : 'Clique para ver o resumo'}
      </p>
    </button>
  )
}

export default function Skills() {
  const [openTitle, setOpenTitle] = useState(null)

  return (
    <section id="habilidades" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-cyan uppercase">Habilidades</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Matriz de <span className="text-gradient">domínio</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Stack técnica + experiência operacional — do código à gestão de materiais. Clique em um card para abrir o resumo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" data-reveal-group>
          {skillGroups.map((g) => (
            <SkillCard
              key={g.title}
              group={g}
              open={openTitle === g.title}
              onToggle={() => setOpenTitle((t) => (t === g.title ? null : g.title))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
