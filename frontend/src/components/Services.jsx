import { useMemo, useState } from 'react'
import { site } from '../config/site.js'
import Magnetic from './Magnetic.jsx'

/**
 * Orçamento organizado por tipo de programação.
 * Clique na categoria para ver o que pode ser feito nela.
 */
const categories = [
  {
    id: 'dev-fixo',
    title: 'Dev Fixo FiveM',
    subtitle: 'Manutenção mensal da cidade',
    accent: 'emerald',
    items: [
      {
        id: 'fivem-dev-fixo',
        title: 'Dev Fixo FiveM (mensal)',
        description: 'Manutenção da cidade, estabilidade dos sistemas, instalações, atualizações e suporte contínuo.',
        price: 500,
        period: '/mês',
      },
      {
        id: 'fivem-dev-fixo-plus',
        title: 'Dev Fixo FiveM Plus (mensal)',
        description: 'Plano mensal com prioridade, mais horas e criação de scripts sob demanda no mês.',
        price: 900,
        period: '/mês',
      },
      {
        id: 'fivem-manutencao-pontual',
        title: 'Manutenção pontual da cidade',
        description: 'Diagnóstico, correção de bugs e estabilização sem contrato mensal.',
        price: 500,
        period: '',
      },
    ],
  },
  {
    id: 'fivem',
    title: 'FiveM / Lua',
    subtitle: 'Scripts, otimização e recursos da cidade',
    accent: 'cyan',
    items: [
      {
        id: 'fivem-script-avulso',
        title: 'Criação de script FiveM',
        description: 'Jobs, inventário, economia, HUD e sistemas sob medida (QBcore/Creative).',
        price: 500,
        period: '',
      },
      {
        id: 'fivem-instalacao',
        title: 'Instalação e atualização de scripts',
        description: 'Instalação, configuração e atualização de recursos com testes de estabilidade.',
        price: 500,
        period: '',
      },
      {
        id: 'script-fivem',
        title: 'Script FiveM customizado (completo)',
        description: 'Sistema mais robusto de inventário, economia ou jobs exclusivos.',
        price: 1800,
        period: '',
      },
      {
        id: 'otimizacao-fivem',
        title: 'Otimização de base FiveM',
        description: 'Redução de ms/tick, limpeza de recursos e estabilidade em servidores grandes.',
        price: 1400,
        period: '',
      },
    ],
  },
  {
    id: 'python',
    title: 'Python',
    subtitle: 'Automação, bots e scripts de dados',
    accent: 'yellow',
    items: [
      {
        id: 'python-automacao',
        title: 'Automação com Python',
        description: 'Scripts para automatizar tarefas, planilhas, relatórios e fluxos operacionais.',
        price: 1200,
        period: '',
      },
      {
        id: 'python-bot',
        title: 'Bot / integração em Python',
        description: 'Bots de monitoramento, integração com APIs e automações sob medida.',
        price: 1500,
        period: '',
      },
      {
        id: 'python-dados',
        title: 'Scripts de dados e relatórios',
        description: 'Tratamento de dados, geração de relatórios e apoio a decisões operacionais.',
        price: 1400,
        period: '',
      },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript / Node.js',
    subtitle: 'APIs, backends e automações',
    accent: 'lime',
    items: [
      {
        id: 'api-backend',
        title: 'API REST / Backend Node.js',
        description: 'API escalável com autenticação, banco de dados e documentação.',
        price: 4500,
        period: '',
      },
      {
        id: 'automacao-node',
        title: 'Automação com Node.js',
        description: 'Fluxos automatizados, integrações e scripts de alta performance.',
        price: 1800,
        period: '',
      },
      {
        id: 'whatsapp-integracao',
        title: 'Integração WhatsApp Business',
        description: 'Fluxos automatizados, notificações e atendimento via WhatsApp.',
        price: 1200,
        period: '',
      },
    ],
  },
  {
    id: 'web',
    title: 'Web / React',
    subtitle: 'Sites, landing pages e lojas',
    accent: 'purple',
    items: [
      {
        id: 'landing',
        title: 'Landing Page profissional',
        description: 'Página de alta conversão, responsiva, animada e otimizada para SEO.',
        price: 1500,
        period: '',
      },
      {
        id: 'site-institucional',
        title: 'Site institucional (até 5 páginas)',
        description: 'Site completo com seções, formulário de contato e design personalizado.',
        price: 3200,
        period: '',
      },
      {
        id: 'ecommerce',
        title: 'E-commerce básico',
        description: 'Loja online com catálogo, carrinho e integração de pagamento.',
        price: 8500,
        period: '',
      },
      {
        id: 'dashboard',
        title: 'Dashboard / painel web',
        description: 'Painel administrativo com relatórios, gráficos e controle de usuários.',
        price: 5500,
        period: '',
      },
    ],
  },
  {
    id: 'discord',
    title: 'Discord / Bots',
    subtitle: 'Tickets, whitelist e comunidade',
    accent: 'indigo',
    items: [
      {
        id: 'bot-discord-basico',
        title: 'Bot Discord (tickets + whitelist)',
        description: 'Bot de tickets, whitelist automatizada e moderação essencial.',
        price: 1000,
        period: '',
      },
      {
        id: 'bot-discord-avancado',
        title: 'Bot Discord avançado',
        description: 'Dashboard, níveis, integração com APIs e automação completa.',
        price: 2200,
        period: '',
      },
    ],
  },
  {
    id: 'sistemas',
    title: 'Sistemas e logística',
    subtitle: 'Estoque, gestão e consultoria',
    accent: 'blue',
    items: [
      {
        id: 'estoque-logistica',
        title: 'Sistema de estoque / logística',
        description: 'Controle de materiais, compras, inventário e relatórios de almoxarifado.',
        price: 6500,
        period: '',
      },
      {
        id: 'consultoria',
        title: 'Consultoria técnica (pacote 5h)',
        description: 'Diagnóstico de infraestrutura, código, performance e arquitetura.',
        price: 650,
        period: '',
      },
    ],
  },
]

const allItems = categories.flatMap((c) => c.items.map((item) => ({ ...item, categoryId: c.id, categoryTitle: c.title })))

const accentMap = {
  emerald: {
    badge: 'bg-emerald-400/15 text-emerald-400',
    ring: 'ring-emerald-400/40',
    border: 'hover:border-emerald-400/40',
  },
  cyan: {
    badge: 'bg-neon-cyan/15 text-neon-cyan',
    ring: 'ring-neon-cyan/40',
    border: 'hover:border-neon-cyan/40',
  },
  yellow: {
    badge: 'bg-yellow-400/15 text-yellow-300',
    ring: 'ring-yellow-400/40',
    border: 'hover:border-yellow-400/40',
  },
  lime: {
    badge: 'bg-lime-400/15 text-lime-300',
    ring: 'ring-lime-400/40',
    border: 'hover:border-lime-400/40',
  },
  purple: {
    badge: 'bg-neon-purple/15 text-neon-purple',
    ring: 'ring-neon-purple/40',
    border: 'hover:border-neon-purple/40',
  },
  indigo: {
    badge: 'bg-indigo-400/15 text-indigo-300',
    ring: 'ring-indigo-400/40',
    border: 'hover:border-indigo-400/40',
  },
  blue: {
    badge: 'bg-neon-blue/15 text-neon-blue',
    ring: 'ring-neon-blue/40',
    border: 'hover:border-neon-blue/40',
  },
}

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function priceLabel(s) {
  return `${formatBRL(s.price)}${s.period || ''}`
}

export default function Services() {
  const [openCat, setOpenCat] = useState('dev-fixo')
  const [selected, setSelected] = useState(() => new Set())
  const [clientName, setClientName] = useState('')

  const toggleItem = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedList = useMemo(
    () => allItems.filter((s) => selected.has(s.id)),
    [selected],
  )

  const total = useMemo(
    () => selectedList.reduce((sum, s) => sum + s.price, 0),
    [selectedList],
  )

  const hasMonthly = selectedList.some((s) => s.period === '/mês')

  const buildWhatsAppUrl = () => {
    const lines = selectedList.map((s) => `• [${s.categoryTitle}] ${s.title}: ${priceLabel(s)}`)
    const namePart = clientName.trim() ? `Nome: ${clientName.trim()}\n\n` : ''
    const totalLine = hasMonthly
      ? `*Total estimado: ${formatBRL(total)}* (itens mensais se aplicam por mês)`
      : `*Total estimado: ${formatBRL(total)}*`
    const text = `Olá Allan! Fiz um orçamento no site mirandadeveloper:\n\n${namePart}${lines.join('\n')}\n\n${totalLine}\n\nGostaria de conversar. Se precisar, podemos negociar para caber no meu orçamento.`
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="servicos" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-cyan uppercase">
            Serviços e orçamento
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Escolha o tipo de <span className="text-gradient">programação</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Clique em uma área (FiveM, Python, Web…) para ver o que posso criar.
            Marque os itens, veja o total e envie no WhatsApp. Valores de referência — negociamos com transparência.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3" data-reveal-group>
            {categories.map((cat) => {
              const isOpen = openCat === cat.id
              const accent = accentMap[cat.accent] || accentMap.cyan
              const selectedInCat = cat.items.filter((i) => selected.has(i.id)).length

              return (
                <div
                  key={cat.id}
                  data-reveal-child
                  className={`glass neon-border overflow-hidden rounded-2xl transition-all duration-300 ${
                    isOpen ? `ring-1 ${accent.ring}` : accent.border
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenCat(isOpen ? null : cat.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${accent.badge}`}>
                          {cat.title}
                        </span>
                        {selectedInCat > 0 && (
                          <span className="rounded-full bg-neon-cyan/15 px-2 py-0.5 text-[10px] font-semibold text-neon-cyan">
                            {selectedInCat} selecionado{selectedInCat > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-400">{cat.subtitle}</p>
                    </div>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg transition-all ${
                        isOpen
                          ? 'rotate-45 border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                          : 'border-slate-600 text-slate-400'
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 border-t border-night-700 px-5 pb-5 pt-4">
                        {cat.items.map((item) => {
                          const isOn = selected.has(item.id)
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleItem(item.id)}
                              aria-pressed={isOn}
                              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                                isOn
                                  ? 'border-neon-cyan/50 bg-neon-cyan/10'
                                  : 'border-night-700 bg-night-900/40 hover:border-neon-cyan/30'
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                  isOn
                                    ? 'border-neon-cyan bg-neon-cyan text-night-950'
                                    : 'border-slate-600 text-transparent'
                                }`}
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                  <h4 className="font-display text-sm font-bold text-white">{item.title}</h4>
                                  <span className="shrink-0 font-mono text-sm font-semibold text-neon-cyan">
                                    a partir de {priceLabel(item)}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <aside className="lg:col-span-2" data-reveal-right>
            <div className="glass neon-border sticky top-24 rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-white">Seu orçamento</h3>
              <p className="mt-1 text-xs text-slate-500">
                Valores de referência · negociamos para caber no seu bolso
              </p>

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
                    Abra uma categoria e marque o que precisa.
                  </li>
                )}
                {selectedList.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-start justify-between gap-3 rounded-lg bg-night-800/50 px-3 py-2.5 text-sm"
                  >
                    <span className="text-slate-200">
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500">{s.categoryTitle}</span>
                      {s.title}
                    </span>
                    <span className="shrink-0 font-mono text-neon-cyan">{priceLabel(s)}</span>
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
                {hasMonthly && (
                  <p className="mt-1 text-right text-[11px] text-slate-500">Inclui item(ns) mensal(is)</p>
                )}
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
                Pode negociar o valor · WhatsApp {site.phone}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
