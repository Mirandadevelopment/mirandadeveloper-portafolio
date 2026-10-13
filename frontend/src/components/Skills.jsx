import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  {
    title: 'Desenvolvimento & Programação',
    color: 'from-neon-cyan to-neon-blue',
    items: [
      { name: 'JavaScript (Node.js)', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'C++ / C#', level: 78 },
      { name: 'Lua', level: 88 },
      { name: 'Git / GitHub', level: 87 },
      { name: 'SQL', level: 84 },
    ],
  },
  {
    title: 'Dados & BI',
    color: 'from-neon-purple to-neon-cyan',
    items: [
      { name: 'Power BI', level: 72 },
      { name: 'Excel Avançado com Copilot', level: 82 },
      { name: 'Modelagem SQL', level: 84 },
      { name: 'Análise de indicadores', level: 79 },
      { name: 'Relatórios operacionais', level: 83 },
    ],
  },
  {
    title: 'Tecnologias & Frameworks',
    color: 'from-neon-blue to-neon-purple',
    items: [
      { name: 'QBcore / Creative (FiveM)', level: 88 },
      { name: 'APIs e integrações', level: 86 },
      { name: 'Supabase', level: 78 },
      { name: 'AWS', level: 70 },
      { name: 'Automação de sistemas', level: 90 },
    ],
  },
  {
    title: 'Gestão Operacional',
    color: 'from-emerald-400 to-neon-cyan',
    items: [
      { name: 'Controle de Estoque', level: 93 },
      { name: 'Compras Técnicas', level: 90 },
      { name: 'Almoxarifado', level: 92 },
      { name: 'Logística de Materiais', level: 91 },
      { name: 'Organização de Layouts', level: 85 },
    ],
  },
]

function SkillCard({ group }) {
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
    <div
      ref={ref}
      data-reveal-child
      className="glass neon-border group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40"
    >
      <h3 className="font-display flex items-center gap-2 text-base font-bold text-white">
        <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${group.color}`} />
        {group.title}
      </h3>
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
    </div>
  )
}

export default function Skills() {
  return (
    <section id="habilidades" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-cyan uppercase">Habilidades</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Competências em <span className="text-gradient">tecnologia e operação</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Experiência construída entre desenvolvimento de software, análise de dados e gestão de materiais.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((g) => (
            <SkillCard key={g.title} group={g} />
          ))}
        </div>
      </div>
    </section>
  )
}
