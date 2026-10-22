import SectionHeading from './SectionHeading.jsx'

const milestones = [
  {
    tag: 'Sodexo · 2016–2021',
    title: 'Facilities & Manutenção',
    text: 'Contratos corporativos de infraestrutura e manutenção predial. Controle de materiais de uso diário e apoio a equipes de engenharia.',
    dot: 'bg-slate-400',
    bar: 'from-slate-400/60 to-slate-400/10',
  },
  {
    tag: 'EPS / Petrobras · 2021–2025',
    title: 'Controle de Materiais & Logística',
    text: 'Gestão integral de almoxarifado (marcenaria), compras técnicas e fabricação de embalagens sob medida para plataformas Petrobras.',
    dot: 'bg-neon-blue glow-cyan',
    bar: 'from-neon-blue/60 to-neon-blue/10',
  },
  {
    tag: 'Freelancer · 2024–Atual',
    title: 'Full Stack & FiveM',
    text: 'Scripts complexos em Lua (QBcore/Creative), bots Node.js/Python, modelagem SQL e sistemas de economia/inventário para servidores.',
    dot: 'bg-neon-cyan glow-cyan',
    bar: 'from-neon-cyan/60 to-neon-cyan/10',
  },
  {
    tag: 'Unicesumar · 2026–2028',
    title: 'ADS — Análise e Desenvolvimento de Sistemas',
    text: 'Graduação em andamento (EAD · Polo Piabetá). Unindo teoria de software com prática em automação, APIs e sistemas de gestão.',
    dot: 'bg-neon-purple glow-purple',
    bar: 'from-neon-purple/60 to-neon-purple/10',
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
                Operações + <span className="text-gradient">código</span>
              </>
            }
            description="Da logística de grandes empresas ao desenvolvimento de sistemas e servidores."
          />
        </div>

        <ol className="relative border-l border-night-700 pl-6 sm:pl-10" data-reveal-group>
          {milestones.map((m, i) => (
            <li key={m.title} className="relative pb-12 last:pb-0">
              <span
                className={`absolute top-1 -left-8 h-4 w-4 rounded-full sm:-left-12 ${m.dot}`}
                aria-hidden="true"
              />
              <div data-reveal-child className="glass neon-border group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
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
