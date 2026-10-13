import CodeWindow from './CodeWindow.jsx'
import CodeRain from './CodeRain.jsx'
import SectionHeading from './SectionHeading.jsx'

const codeLines = [
  { text: '// ALLAN.OPS SYSTEM v3.0 — perfil profissional', color: 'text-slate-500' },
  { text: 'const allan = {', color: 'text-slate-300' },
  { text: '  name: "Allan Miranda da Rosa",', color: 'text-emerald-400' },
  { text: '  role: "Analista de Sistemas de Operação",', color: 'text-sky-400' },
  { text: '  stack: ["Node.js", "Python", "C++", "SQL", "Lua"],', color: 'text-purple-400' },
  { text: '  focus: ["materiais", "logistica", "automacao"],', color: 'text-yellow-300' },
  { text: '  clients: ["Petrobras", "Sodexo"],', color: 'text-sky-400' },
  { text: '  status: "ready_for_next_challenge",', color: 'text-neon-cyan' },
  { text: '}', color: 'text-slate-300' },
  { text: 'while (operacaoAtiva) { analisar(); otimizar(); entregar(); }', color: 'text-neon-cyan' },
]

const points = [
  {
    title: 'Gestão orientada por processo',
    text: 'Controle de entrada, saída e reposição com rastreabilidade e previsibilidade operacional.',
  },
  {
    title: 'Automação aplicada ao negócio',
    text: 'Scripts, bots e integrações para reduzir tarefas manuais e aumentar produtividade.',
  },
  {
    title: 'Visão técnica de ponta a ponta',
    text: 'Atuação que conecta operação, infraestrutura e desenvolvimento com foco em resultado.',
  },
  {
    title: 'Execução em ambientes críticos',
    text: 'Experiência em contratos e operações de alta exigência, com responsabilidade e consistência.',
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
                Allan Miranda da Rosa em <span className="text-gradient">execução</span>
              </>
            }
            description="Um perfil técnico-operacional que combina análise, desenvolvimento e logística para resolver problemas reais."
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
              &gt; uptime: 9+ anos de operação
            </div>
            <div
              data-parallax
              data-speed="-0.3"
              className="glass neon-border absolute -bottom-6 -left-3 hidden rounded-xl px-4 py-3 font-mono text-xs text-emerald-400 md:block"
            >
              &gt; status: disponível
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
