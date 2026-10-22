import { site } from '../config/site.js'

export default function About() {
  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-2.5 1.6 1-2.9L8 11.5h3l1-2.9 1 2.9h3l-2.5 2.2 1 2.9L12 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
      ),
      title: 'Operações & Logística',
      text: 'Experiência real em controle de materiais, almoxarifado e logística para Petrobras e Sodexo — disciplina de inventário aplicada a sistemas.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-purple">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 1.8 8.5 12 14l8.4-4.5V17h1.7v-8L12 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.2V17c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.8" />
        </svg>
      ),
      title: 'Formação em ADS',
      text: 'Graduando em Análise e Desenvolvimento de Sistemas (Unicesumar). Teoria de software aplicada diariamente em projetos reais.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9 text-neon-blue">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 15.5 14 12l3.5 3.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 1 0 9 9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Full Stack & Automação',
      text: 'Scripts em Lua (QBcore/Creative), bots Node.js/Python, APIs, SQL e sistemas de gestão com foco em performance e clareza.',
    },
  ]

  return (
    <section id="sobre" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-purple uppercase">Sobre mim</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Código com <span className="text-gradient">experiência real</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative" data-reveal-left>
            <div className="neon-border glass float-slow rounded-2xl p-8">
              <div className="font-display text-5xl font-extrabold text-gradient">AM</div>
              <div className="mt-2 font-mono text-sm text-neon-cyan">
                &gt; init allan.miranda --fullstack --logistics --focus
              </div>
              <div className="mt-4 font-mono text-xs text-slate-400">
                &gt; role: <span className="text-neon-purple">Analista · Full Stack · FiveM</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; status: <span className="text-emerald-400">open_for_projects</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; location: <span className="text-slate-300">mage_rj.brasil</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; remote: <span className="text-slate-300">[brasil, eua, canada]</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                &gt; ops: <span className="text-slate-300">petrobras · sodexo · freela</span>
              </div>
            </div>
          </div>

          <div data-reveal-right>
            <p className="text-lg leading-relaxed text-slate-300">
              Sou <strong className="text-white">{site.name}</strong> — desenvolvedor{' '}
              <strong className="text-neon-cyan">Full Stack</strong>, analista de sistemas de operação e
              especialista em <strong className="text-neon-purple">FiveM (Lua/JS)</strong> e automação.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Unei uma sólida trajetória em Controle de Materiais, Compras e Gestão de Estoque (Petrobras via
              EPS e Sodexo) com desenvolvimento de software. Aplico Node.js, Python, C++ e SQL para resolver
              desafios reais de inventário, logística e sistemas de tempo real.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Atualmente graduando em ADS pela Unicesumar e disponível para projetos presenciais e remotos.
              Baixe meu currículo completo ou monte um orçamento na seção de serviços.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/20"
              >
                Baixar CV (HTML)
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-400/20"
              >
                Falar no WhatsApp
              </a>
            </div>
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
