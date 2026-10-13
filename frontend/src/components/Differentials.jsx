const differentials = [
  {
    title: 'Visão Operacional + Técnica',
    text: 'Capacidade de traduzir necessidade de campo em solução digital com foco em continuidade e resultado.',
    accent: 'text-neon-cyan',
    border: 'hover:border-neon-cyan/60',
  },
  {
    title: 'Automação com Eficiência',
    text: 'Implementação de fluxos automatizados para reduzir esforço manual e elevar produtividade das equipes.',
    accent: 'text-neon-purple',
    border: 'hover:border-neon-purple/60',
  },
  {
    title: 'Execução Confiável',
    text: 'Atuação disciplinada em ambientes de alta exigência, com entrega estável, comunicação clara e melhoria contínua.',
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
            Diferenciais de um perfil <span className="text-gradient">ADS</span>
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
