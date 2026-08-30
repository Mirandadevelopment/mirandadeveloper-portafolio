import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  {
    title: 'Linguagens & Core',
    color: 'from-neon-cyan to-neon-blue',
    items: [
      { name: 'Lua', level: 95 },
      { name: 'JavaScript', level: 92 },
      { name: 'Node.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'HTML5 / CSS3', level: 88 },
      { name: 'SQL', level: 82 },
    ],
  },
  {
    title: 'Desenvolvimento FiveM',
    color: 'from-neon-purple to-neon-cyan',
    items: [
      { name: 'Frameworks vRP / Creative', level: 94 },
      { name: 'Otimização (ms/tick)', level: 96 },
      { name: 'Sistemas de Inventário', level: 90 },
      { name: 'Whitelist & Anti-cheat', level: 88 },
      { name: 'Integração Web-Game', level: 86 },
      { name: 'Gestão de Bases', level: 92 },
    ],
  },
  {
    title: 'Automação & Bots',
    color: 'from-neon-blue to-neon-purple',
    items: [
      { name: 'discord.js / burrito', level: 91 },
      { name: 'Integração com APIs', level: 89 },
      { name: 'Dashboards em tempo real', level: 88 },
      { name: 'Sistema de Tickets', level: 93 },
      { name: 'Verificação automática', level: 87 },
    ],
  },
  {
    title: 'Infraestrutura & Redes',
    color: 'from-emerald-400 to-neon-cyan',
    items: [
      { name: 'Servidores dedicados', level: 85 },
      { name: 'SQL Server / MySQL', level: 86 },
      { name: 'Virtualização (VirtualBox)', level: 84 },
      { name: 'Windows Server', level: 80 },
      { name: 'Hospedagem remota', level: 88 },
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
            Matriz de <span className="text-gradient">Maestria</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Domínio medido em projetos reais — as barras revelam o nível em cada tecnologia.
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
