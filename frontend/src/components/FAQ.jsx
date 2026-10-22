import { useState } from 'react'

const items = [
  {
    q: 'Como funciona o orçamento?',
    a: 'Você monta o pacote na seção Serviços, vê o total na hora e envia pelo WhatsApp com tudo listado. Ajustamos juntos escopo, prazo e valor final antes de começar.',
  },
  {
    q: 'Qual o prazo médio de entrega?',
    a: 'Landing e bots simples: 3 a 10 dias. Sites e APIs: 1 a 3 semanas. Sistemas maiores (estoque, dashboard, e-commerce): alinhamos um cronograma por etapas com entregas parciais.',
  },
  {
    q: 'Você trabalha com FiveM / Discord?',
    a: 'Sim. Scripts QBcore/Creative, otimização de base, bots de ticket/whitelist e integrações web ↔ servidor. É uma das minhas especialidades práticas.',
  },
  {
    q: 'Aceita projetos remotos fora do Brasil?',
    a: 'Sim. Atendo remoto para BR, EUA e Canadá. Comunicação em português (e inglês básico/técnico quando necessário).',
  },
  {
    q: 'Como é o pagamento?',
    a: 'Geralmente 50% no início e 50% na entrega, ou por marcos em projetos maiores. PIX, transferência ou acordo combinado no contrato simples.',
  },
  {
    q: 'Posso pedir só uma parte (ex.: só a API)?',
    a: 'Claro. Cada item do orçamento é independente. Você escolhe só o que precisa e soma o restante depois se quiser.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-emerald-400 uppercase">FAQ</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Perguntas <span className="text-gradient">frequentes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Clique em cada balão para abrir a resposta.
          </p>
        </div>

        <div className="space-y-3" data-reveal-group>
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <button
                key={item.q}
                type="button"
                data-reveal-child
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`glass neon-border w-full rounded-2xl p-5 text-left transition-all duration-300 ${
                  isOpen ? 'ring-1 ring-neon-cyan/40 bg-neon-cyan/5' : 'hover:border-neon-cyan/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-base font-bold text-white sm:text-lg">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg transition-all ${
                      isOpen
                        ? 'border-neon-cyan bg-neon-cyan text-night-950 rotate-45'
                        : 'border-slate-600 text-slate-400'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-slate-400 sm:text-base">{item.a}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
