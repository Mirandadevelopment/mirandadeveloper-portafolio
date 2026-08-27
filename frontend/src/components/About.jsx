export default function About() {
  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-2.5 1.6 1-2.9L8 11.5h3l1-2.9 1 2.9h3l-2.5 2.2 1 2.9L12 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
      ),
      title: 'Disciplina Militar',
      text: 'Ex-Paraquedista (PQD) do Exército Brasileiro. Hábito de cumprir prazos, seguir padrões e manter a calma sob pressão.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-purple">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 1.8 8.5 12 14l8.4-4.5V17h1.7v-8L12 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.2V17c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.8" />
        </svg>
      ),
      title: 'Formação Acadêmica',
      text: 'Graduando em Análise e Desenvolvimento de Sistemas (ADS) pela Unicesumar, unindo teoria à prática diária.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-blue">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 15.5 14 12l3.5 3.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 1 0 9 9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Resolução de Problemas',
      text: 'Paixão por transformar problemas complexos em soluções simples, performáticas e de manutenção clara.',
    },
  ]

  return (
    <section id="sobre" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-purple uppercase">Sobre mim</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Disciplina que <span className="text-gradient">vira código</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative" data-reveal-left>
            <div className="neon-border glass float-slow rounded-2xl p-8">
              <div className="font-display text-5xl font-extrabold text-gradient">AM</div>
              <div className="mt-2 font-mono text-sm text-neon-cyan">
                &gt; init allan.miranda --discipline --focus --leadership
              </div>
              <div className="mt-4 font-mono text-xs text-slate-400">
                &gt; serial: <span className="text-neon-purple">PQD_82061</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; status: <span className="text-emerald-400">ready_for_missions</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; location: <span className="text-slate-300">rio_de_janeiro.brasil</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; remote: <span className="text-slate-300">[brasil, eua, canada]</span>
              </div>
            </div>
          </div>

          <div data-reveal-right>
            <p className="text-lg leading-relaxed text-slate-300">
              Sou desenvolvedor <strong className="text-white">Full Stack</strong> e especialista no
              ecossistema <strong className="text-neon-cyan">FiveM</strong>, focado em criar soluções
              robustas com <strong className="text-neon-purple">Lua, JavaScript e Node.js</strong>.
              Atuei na otimização de servidores de grande porte, automação para Discord e sistemas de
              gestão integrados.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              A vida militar me ensinou que performance não é sorte — é método. O mesmo rigor com que se
              salta de paraquedas, cumpre-se uma missão ou lidera-se uma equipe é o que aplico em cada linha
              de código: precisão, disciplina e entrega sob pressão.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Hoje, moro no Rio de Janeiro e estou aberto a oportunidades presenciais e remotas, no Brasil
              ou no exterior — especialmente EUA e Canadá.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3" data-reveal-group>
          {pillars.map((p) => (
            <div
              key={p.title}
              data-reveal-child
              data-tilt
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
