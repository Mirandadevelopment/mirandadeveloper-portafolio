const differentials = [
  {
    title: 'Resolução rápida de problemas',
    text: 'Método de diagnóstico direto: identificar, isolar e eliminar a causa raiz com rapidez e precisão.',
    accent: 'text-neon-cyan',
    border: 'hover:border-neon-cyan/60',
  },
  {
    title: 'Otimização extrema de performance',
    text: 'Redução de consumo de ms/tick em servidores FiveM e código enxuto, escalável e auditável.',
    accent: 'text-neon-purple',
    border: 'hover:border-neon-purple/60',
  },
  {
    title: 'Parcerias técnicas de alto nível',
    text: 'Experiência com suporte técnico próximo, atendimento claro e entrega consistente.',
    accent: 'text-neon-blue',
    border: 'hover:border-neon-blue/60',
  },
]

export default function Differentials() {
  return (
    <section id="diferenciais" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-cyan uppercase">Vantagem competitiva</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Por que <span className="text-gradient">me escolher?</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3" data-reveal-group>
          {differentials.map((d, i) => (
            <div
              key={d.title}
              data-reveal-child
              className={`glass neon-border group rounded-2xl border-transparent p-8 text-center transition-all duration-300 hover:-translate-y-1.5 ${d.border}`}
            >
              <div className={`font-display text-5xl font-extrabold ${d.accent} opacity-90`}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display mt-5 text-xl font-bold text-white">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
