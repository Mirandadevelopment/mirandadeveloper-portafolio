export default function About() {
  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M6 10h12M7 14h10M8 18h8" />
        </svg>
      ),
      title: 'Controle de Materiais',
      text: 'Gestão integral de almoxarifado, controle de estoque e compras técnicas com foco em confiabilidade operacional.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-purple">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      ),
      title: 'Automação e Desenvolvimento',
      text: 'Automação de processos com Node.js, Python e C++, além de integração de sistemas e bancos SQL para operações em tempo real.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-blue">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l4-4 4 4 4-4 6 6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
        </svg>
      ),
      title: 'Logística Técnica',
      text: 'Atuação em operações críticas para Petrobras e Sodexo, com foco em fluxo logístico, infraestrutura e eficiência de campo.',
    },
  ]

  return (
    <section id="sobre" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-purple uppercase">Sobre mim</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Tecnologia aplicada à <span className="text-gradient">operação real</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative" data-reveal-left>
            <div className="neon-border glass float-slow rounded-2xl p-8">
              <div className="font-display text-5xl font-extrabold text-gradient">AM</div>
              <div className="mt-2 font-mono text-sm text-neon-cyan">
                &gt; init allan.miranda.da.rosa --operacoes --software --logistica
              </div>
              <div className="mt-4 font-mono text-xs text-slate-400">
                &gt; role: <span className="text-neon-purple">analista_sistemas_operacao</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; stack: <span className="text-emerald-400">[node, python, cpp, sql]</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; location: <span className="text-slate-300">mage.rj.brasil</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; focus: <span className="text-slate-300">materiais, estoque, automacao</span>
              </div>
            </div>
          </div>

          <div data-reveal-right>
            <p className="text-lg leading-relaxed text-slate-300">
              Sou <strong className="text-white">Analista de Sistemas de Operação</strong> e
              <strong className="text-neon-cyan"> Desenvolvedor Full Stack</strong>, com trajetória
              prática em controle de materiais, compras técnicas e gestão de estoque.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Como freelancer, desenvolvo scripts e automações para sistemas complexos com
              <strong className="text-neon-purple"> Node.js, Python, C++, Lua e SQL</strong>, conectando
              tecnologia a necessidades operacionais reais.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Também atuei em operações e infraestrutura em contratos de grande porte, contribuindo com
              logística técnica, organização de layouts e suporte a equipes multidisciplinares.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3" data-reveal-group>
          {pillars.map((p) => (
            <div
              key={p.title}
              data-reveal-child
              className="glass neon-border group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-purple"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">{p.icon}</div>
              <h3 className="font-display mt-4 text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
