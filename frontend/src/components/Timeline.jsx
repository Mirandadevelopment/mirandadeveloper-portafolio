import SectionHeading from './SectionHeading.jsx'

const milestones = [
  {
    tag: 'Sodexo · 2016–2021',
    title: 'Infraestrutura e manutenção técnica',
    text: 'Atuação em contratos corporativos com manutenção preventiva e corretiva, apoio operacional e controle de materiais de uso diário.',
    dot: 'bg-neon-cyan glow-cyan',
    bar: 'from-neon-cyan/60 to-neon-cyan/10',
  },
  {
    tag: 'EPS / Petrobras · 2021–2025',
    title: 'Controle de materiais e logística crítica',
    text: 'Gestão de almoxarifado, compras técnicas e fabricação de embalagens sob medida para transporte seguro de materiais críticos.',
    dot: 'bg-neon-purple glow-purple',
    bar: 'from-neon-purple/60 to-neon-purple/10',
  },
  {
    tag: 'Freelancer · 2024–Atual',
    title: 'Sistemas de operação e desenvolvimento Full Stack',
    text: 'Desenvolvimento de automações, bots e sistemas com SQL em tempo real, incluindo diagnóstico de infraestrutura e recuperação de dados.',
    dot: 'bg-neon-blue glow-cyan',
    bar: 'from-neon-blue/60 to-neon-blue/10',
  },
  {
    tag: 'Unicesumar · ADS',
    title: 'Formação acadêmica em tecnologia',
    text: 'Graduação em andamento com foco em desenvolvimento de sistemas, arquitetura, redes e aplicação prática no cenário operacional.',
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
                Operação, logística e <span className="text-gradient">software</span>
              </>
            }
            description="Evolução profissional com entregas práticas em ambientes críticos e alta exigência técnica."
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
