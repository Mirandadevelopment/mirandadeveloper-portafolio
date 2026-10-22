import { useState } from 'react'

const steps = [
  {
    n: '01',
    title: 'Briefing rápido',
    text: 'Você conta o que precisa (WhatsApp ou formulário). Eu confirmo escopo, prazo e valor em poucas mensagens.',
    detail: 'Pode mandar prints, lista de scripts ou só a ideia da cidade. Quanto mais claro o briefing, mais rápido o orçamento fecha.',
  },
  {
    n: '02',
    title: 'Proposta clara',
    text: 'Orçamento itemizado, o que entra e o que fica de fora. Sem letra miúda — alinhamos antes de codar.',
    detail: 'Se o valor apertar, negociamos com transparência para caber no seu bolso sem comprometer a qualidade do essencial.',
  },
  {
    n: '03',
    title: 'Desenvolvimento',
    text: 'Entregas parciais quando fizer sentido. Você acompanha e pede ajustes enquanto o projeto anda.',
    detail: 'No Dev Fixo mensal, priorizo estabilidade da cidade, instalações, atualizações e correções no dia a dia.',
  },
  {
    n: '04',
    title: 'Entrega e suporte',
    text: 'Código documentado, deploy se combinado e uma janela de ajustes pós-entrega para deixar redondo.',
    detail: 'Após a entrega, combinamos uma janela de suporte para pequenos ajustes e dúvidas de uso.',
  },
]

export default function Process() {
  const [open, setOpen] = useState(null)

  return (
    <section id="processo" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-cyan uppercase">Como contratamos</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Do primeiro contato à <span className="text-gradient">entrega</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Processo simples e transparente. Clique em cada etapa para ver mais detalhes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {steps.map((s, i) => {
            const isOpen = open === i
            return (
              <button
                key={s.n}
                type="button"
                data-reveal-child
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`glass neon-border group relative rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:glow-cyan ${
                  isOpen ? 'ring-1 ring-neon-cyan/50 bg-neon-cyan/5' : ''
                }`}
              >
                <div className="font-display text-4xl font-extrabold text-gradient opacity-80">{s.n}</div>
                <h3 className="font-display mt-3 text-lg font-bold text-white group-hover:text-neon-cyan">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-night-700 pt-3 text-sm leading-relaxed text-slate-300">{s.detail}</p>
                  </div>
                </div>
                <span className="mt-3 block text-[11px] text-slate-500">
                  {isOpen ? 'Clique para fechar' : 'Clique para expandir'}
                </span>
              </button>
            )
          })}
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
