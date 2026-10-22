const steps = [
  {
    n: '01',
    title: 'Briefing rápido',
    text: 'Você conta o que precisa (WhatsApp ou formulário). Eu confirmo escopo, prazo e valor em poucas mensagens.',
  },
  {
    n: '02',
    title: 'Proposta clara',
    text: 'Orçamento itemizado, o que entra e o que fica de fora. Sem letra miúda — alinhamos antes de codar.',
  },
  {
    n: '03',
    title: 'Desenvolvimento',
    text: 'Entregas parciais quando fizer sentido. Você acompanha e pede ajustes enquanto o projeto anda.',
  },
  {
    n: '04',
    title: 'Entrega & suporte',
    text: 'Código documentado, deploy se combinado e uma janela de ajustes pós-entrega para deixar redondo.',
  },
]

export default function Process() {
  return (
    <section id="processo" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-cyan uppercase">Como contratamos</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Do primeiro contato à <span className="text-gradient">entrega</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Processo simples, transparente e feito para fechar projetos com segurança — para você e para mim.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {steps.map((s) => (
            <div
              key={s.n}
              data-reveal-child
              className="glass neon-border group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-cyan"
            >
              <div className="font-display text-4xl font-extrabold text-gradient opacity-80">{s.n}</div>
              <h3 className="font-display mt-3 text-lg font-bold text-white group-hover:text-neon-cyan">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center" data-reveal>
          <a
            href="#servicos"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple px-8 py-3.5 font-semibold text-night-950 transition-all hover:scale-[1.03]"
          >
            Montar meu orçamento agora
          </a>
        </div>
      </div>
    </section>
  )
}
