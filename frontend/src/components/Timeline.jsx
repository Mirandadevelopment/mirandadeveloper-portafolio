import SectionHeading from './SectionHeading.jsx'

const milestones = [
  {
    tag: 'Exército Brasileiro',
    title: 'Formação Militar',
    text: 'Ex-paraquedista (PQD). Disciplina, liderança e resiliência sob pressão — a base de tudo o que faço hoje.',
    dot: 'bg-neon-cyan glow-cyan',
    bar: 'from-neon-cyan/60 to-neon-cyan/10',
  },
  {
    tag: 'Unicesumar',
    title: 'Graduação em ADS',
    text: 'Análise e Desenvolvimento de Sistemas: da arquitetura de software à gestão de projetos, teoria aplicada à prática diária.',
    dot: 'bg-neon-purple glow-purple',
    bar: 'from-neon-purple/60 to-neon-purple/10',
  },
  {
    tag: 'Lua · vRP · Creative',
    title: 'Especialista FiveM',
    text: 'Otimização de servidores de grande porte, frameworks, inventários, whitelist e integração web-game.',
    dot: 'bg-neon-blue glow-cyan',
    bar: 'from-neon-blue/60 to-neon-blue/10',
  },
  {
    tag: 'Node.js · React · Discord',
    title: 'Full Stack & Automação',
    text: 'Sistemas de gestão, bots para comunidades e dashboards em tempo real — código enxuto, escalável e auditável.',
    dot: 'bg-emerald-400 glow-cyan',
    bar: 'from-emerald-400/60 to-emerald-400/10',
  },
]

export default function Timeline() {
  return (
    <section id="trajetoria" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div data-reveal>
          <SectionHeading
            eyebrow="Trajetória"
            eyebrowClass="text-neon-cyan"
            title={
              <>
                Da caserna ao <span className="text-gradient">código</span>
              </>
            }
            description="Uma jornada construída com método, disciplina e entrega sob pressão."
          />
        </div>

        <ol className="relative border-l border-night-700 pl-6 sm:pl-10" data-reveal-group>
          {milestones.map((m, i) => (
            <li key={m.title} className="relative pb-12 last:pb-0">
              <span
                className={`absolute top-1 -left-8 h-4 w-4 rounded-full sm:-left-12 ${m.dot}`}
                aria-hidden="true"
              />
              <div data-reveal-child data-tilt className="glass neon-border group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                <span className="font-mono text-xs text-slate-500">
                  {String(i + 1).padStart(2, '0')} / {m.tag}
                </span>
                <h3 className="font-display mt-2 text-lg font-bold text-white transition-colors group-hover:text-neon-cyan">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
