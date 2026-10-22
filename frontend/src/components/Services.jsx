import { useMemo, useState } from 'react'
import { site } from '../config/site.js'
import Magnetic from './Magnetic.jsx'

/**
 * Preços competitivos (júnior alto / pleno baixo) — valor justo para
 * fechar clientes mais rápido sem parecer serviço barato.
 * Referência de mercado BR 2025/2026; valor final após conversa.
 */
const services = [
  {
    id: 'landing',
    category: 'Web',
    title: 'Landing Page profissional',
    description: 'Página de alta conversão, responsiva, animada e otimizada para SEO.',
    price: 1500,
  },
  {
    id: 'site-institucional',
    category: 'Web',
    title: 'Site institucional (até 5 páginas)',
    description: 'Site completo com seções, formulário de contato e design personalizado.',
    price: 3200,
  },
  {
    id: 'ecommerce',
    category: 'Web',
    title: 'E-commerce básico',
    description: 'Loja online com catálogo, carrinho e integração de pagamento.',
    price: 8500,
  },
  {
    id: 'bot-discord-basico',
    category: 'Bots',
    title: 'Bot Discord (tickets + whitelist)',
    description: 'Bot de tickets, whitelist automatizada e moderação essencial.',
    price: 1000,
  },
  {
    id: 'bot-discord-avancado',
    category: 'Bots',
    title: 'Bot Discord avançado',
    description: 'Dashboard, níveis, integração com APIs e automação completa.',
    price: 2200,
  },
  {
    id: 'script-fivem',
    category: 'FiveM',
    title: 'Script FiveM customizado',
    description: 'Sistemas de inventário, economia, jobs ou recursos exclusivos (QBcore/Creative).',
    price: 1800,
  },
  {
    id: 'otimizacao-fivem',
    category: 'FiveM',
    title: 'Otimização de base FiveM',
    description: 'Redução de ms/tick, limpeza de recursos e estabilidade em servidores grandes.',
    price: 1400,
  },
  {
    id: 'api-backend',
    category: 'Backend',
    title: 'API REST / Backend Node.js',
    description: 'API escalável com autenticação, banco de dados e documentação.',
    price: 4500,
  },
  {
    id: 'dashboard',
    category: 'Sistemas',
    title: 'Dashboard / Sistema de gestão',
    description: 'Painel administrativo com relatórios, gráficos e controle de usuários.',
    price: 5500,
  },
  {
    id: 'automacao',
    category: 'Automação',
    title: 'Automação de processos',
    description: 'Scripts em Node.js ou Python para otimizar fluxos operacionais e dados.',
    price: 1800,
  },
  {
    id: 'estoque-logistica',
    category: 'Sistemas',
    title: 'Sistema de estoque / logística',
    description: 'Controle de materiais, compras, inventário e relatórios de almoxarifado.',
    price: 6500,
  },
  {
    id: 'whatsapp-integracao',
    category: 'Integração',
    title: 'Integração WhatsApp Business',
    description: 'Fluxos automatizados, notificações e atendimento via WhatsApp.',
    price: 1200,
  },
  {
    id: 'consultoria',
    category: 'Consultoria',
    title: 'Consultoria técnica (pacote 5h)',
    description: 'Diagnóstico de infraestrutura, código, performance e arquitetura.',
    price: 650,
  },
]

const categories = ['Todos', ...new Set(services.map((s) => s.category))]

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Services() {
  const [selected, setSelected] = useState(() => new Set())
  const [filter, setFilter] = useState('Todos')
  const [clientName, setClientName] = useState('')

  const visible = filter === 'Todos' ? services : services.filter((s) => s.category === filter)

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedList = useMemo(
    () => services.filter((s) => selected.has(s.id)),
    [selected],
  )

  const total = useMemo(
    () => selectedList.reduce((sum, s) => sum + s.price, 0),
    [selectedList],
  )

  const buildWhatsAppUrl = () => {
    const lines = selectedList.map((s) => `• ${s.title}: ${formatBRL(s.price)}`)
    const namePart = clientName.trim() ? `Nome: ${clientName.trim()}\n\n` : ''
    const text = `Olá Allan! Fiz um orçamento no seu portfólio:\n\n${namePart}${lines.join('\n')}\n\n*Total estimado: ${formatBRL(total)}*\n\nGostaria de conversar sobre esses serviços.`
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="servicos" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-cyan uppercase">
            Serviços & Orçamento
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Monte seu <span className="text-gradient">orçamento</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Selecione os serviços que precisa. Valores justos e competitivos.
            O total é calculado na hora e você envia direto pro WhatsApp.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-neon-cyan ${
                filter === c
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-night-950 shadow-lg shadow-neon-purple/30'
                  : 'glass text-slate-300 hover:text-neon-cyan hover:glow-cyan'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3" data-reveal-group>
            <div className="grid gap-4 sm:grid-cols-2">
              {visible.map((s) => {
                const isOn = selected.has(s.id)
                return (
                  <button
                    key={s.id}
                    type="button"
                    data-reveal-child
                    onClick={() => toggle(s.id)}
                    aria-pressed={isOn}
                    className={`glass neon-border group relative rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                      isOn
                        ? 'ring-2 ring-neon-cyan/70 bg-neon-cyan/5 glow-cyan'
                        : 'hover:border-neon-cyan/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="rounded-full bg-neon-purple/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-neon-purple uppercase">
                          {s.category}
                        </span>
                        <h3 className="font-display mt-2 text-base font-bold text-white group-hover:text-neon-cyan">
                          {s.title}
                        </h3>
                      </div>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all ${
                          isOn
                            ? 'border-neon-cyan bg-neon-cyan text-night-950'
                            : 'border-slate-600 text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
                    <div className="mt-4 font-display text-lg font-bold text-gradient">
                      a partir de {formatBRL(s.price)}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="lg:col-span-2" data-reveal-right>
            <div className="glass neon-border sticky top-24 rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-white">Seu orçamento</h3>
              <p className="mt-1 text-xs text-slate-500">Valores de referência · ajuste final após conversa</p>

              <div className="mt-5">
                <label htmlFor="client-name" className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Seu nome (opcional)
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Como posso te chamar?"
                  className="w-full rounded-lg border border-neon-cyan/20 bg-night-800/60 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-neon-cyan/70 focus:shadow-[0_0_18px_rgba(0,212,255,0.2)]"
                />
              </div>

              <ul className="mt-5 max-h-56 space-y-2 overflow-y-auto pr-1">
                {selectedList.length === 0 && (
                  <li className="rounded-lg border border-dashed border-night-700 px-3 py-6 text-center text-sm text-slate-500">
                    Nenhum serviço selecionado ainda.
                  </li>
                )}
                {selectedList.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-start justify-between gap-3 rounded-lg bg-night-800/50 px-3 py-2.5 text-sm"
                  >
                    <span className="text-slate-200">{s.title}</span>
                    <span className="shrink-0 font-mono text-neon-cyan">{formatBRL(s.price)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-night-700 pt-4">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-slate-400">Total estimado</span>
                  <span className="font-display text-2xl font-extrabold text-gradient">
                    {formatBRL(total)}
                  </span>
                </div>
              </div>

              <Magnetic>
                <a
                  href={selectedList.length ? buildWhatsAppUrl() : undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={selectedList.length === 0}
                  onClick={(e) => {
                    if (selectedList.length === 0) e.preventDefault()
                  }}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-semibold transition-all duration-200 ${
                    selectedList.length
                      ? 'bg-gradient-to-r from-emerald-400 to-neon-cyan text-night-950 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-neon-cyan'
                      : 'cursor-not-allowed bg-night-700 text-slate-500'
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3 0-.1-.2-.2-.5-.3z" />
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3A9.9 9.9 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 0 1 3.8 12c0-4.5 3.7-8.2 8.2-8.2S20.2 7.5 20.2 12s-3.7 8.2-8.2 8.2z" />
                  </svg>
                  Enviar no WhatsApp
                </a>
              </Magnetic>

              <p className="mt-3 text-center text-[11px] text-slate-500">
                Abre o WhatsApp com a seleção pronta · {site.phone2}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
