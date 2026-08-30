import CodeWindow from './CodeWindow.jsx'
import CodeRain from './CodeRain.jsx'
import SectionHeading from './SectionHeading.jsx'

const codeLines = [
  { text: '// ALL.M SYSTEM v2.1 — perfil operacional', color: 'text-slate-500' },
  { text: 'const allan = {', color: 'text-slate-300' },
  { text: '  id: "PQD_82061",', color: 'text-emerald-400' },
  { text: '  role: "Full Stack & FiveM Specialist",', color: 'text-sky-400' },
  { text: '  stack: ["Lua", "JS", "Node", "React"],', color: 'text-purple-400' },
  { text: '  discipline: "military_grade",', color: 'text-yellow-300' },
  { text: '  remote: ["BR", "USA", "CA"],', color: 'text-sky-400' },
  { text: '  optimizedBases: 10,', color: 'text-neon-cyan' },
  { text: '  status: "open_to_missions",', color: 'text-emerald-400' },
  { text: '}', color: 'text-slate-300' },
  { text: 'while (building) { ship(); optimize(); }', color: 'text-neon-cyan' },
]

const points = [
  {
    title: 'Metodologia de combate',
    text: 'Diagnostico, isolamento e eliminacao da causa raiz. Como em uma missao real.',
  },
  {
    title: 'Otimizacao de performance',
    text: 'Reducao de ms/tick, codigo enxuto, escalavel e auditavel.',
  },
  {
    title: 'Automação eficiente',
    text: 'Bots robustos, dashboards em tempo real e integração web-game.',
  },
  {
    title: 'Entrega sob pressao',
    text: 'Prazos cumpridos com a disciplina de quem ja saltou de paraquedas.',
  },
]

export default function SystemSection() {
  return (
    <section id="sistema" className="relative overflow-hidden py-24">
      <CodeRain />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05050f] via-transparent to-[#05050f]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div data-reveal>
          <SectionHeading
            eyebrow="Sistema"
            eyebrowClass="text-neon-cyan"
            title={
              <>
                Allan Miranda em <span className="text-gradient">execucao</span>
              </>
            }
            description="Um perfil que roda como um programa bem escrito: sem bugs, com otimizacao maxima."
          />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <CodeWindow lines={codeLines} title="~/.profile" />
            <div
              data-parallax
              data-speed="0.4"
              className="glass neon-border absolute -top-6 -right-3 hidden rounded-xl px-4 py-3 font-mono text-xs text-neon-cyan md:block"
            >
              &gt; uptime: 4+ anos
            </div>
            <div
              data-parallax
              data-speed="-0.3"
              className="glass neon-border absolute -bottom-6 -left-3 hidden rounded-xl px-4 py-3 font-mono text-xs text-emerald-400 md:block"
            >
              &gt; status: online
            </div>
          </div>

          <div data-reveal-group className="space-y-6">
            {points.map((p) => (
              <div
                key={p.title}
                data-reveal-child
                className="glass neon-border group flex items-start gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
              >
                <span className="font-mono mt-1 text-neon-cyan">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-neon-cyan">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
