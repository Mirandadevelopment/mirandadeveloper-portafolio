import { useState } from 'react'
import { site } from '../config/site.js'

const socials = [
  {
    name: 'GitHub',
    href: site.social.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.6-10.9C23.5 5.7 18.3.5 12 .5z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: site.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14.8H.2V8zM8.3 8h4.4v2h.1c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.3 3 5.3 6.9v8.2h-4.6v-7.3c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8v7.4H8.3V8z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: site.social.discord,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.2a18.3 18.3 0 0 1 5.5 1.7A16 16 0 0 0 12 1.5 16 16 0 0 0 3.7 5.9 18.3 18.3 0 0 1 9.2 4.2L8.6 3a19.8 19.8 0 0 0-4.9 1.4A20.5 20.5 0 0 0 .2 18.3a19.9 19.9 0 0 0 6 3l1.3-2a13 13 0 0 1-2.1-1l.5-.4a14.3 14.3 0 0 0 12.2 0l.5.4a13 13 0 0 1-2.1 1l1.3 2a19.9 19.9 0 0 0 6-3 20.4 20.4 0 0 0-3.5-13.9zM8.5 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm7 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z" />
      </svg>
    ),
  },
  {
    name: 'E-mail',
    href: `mailto:${site.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m2 7 10 7L22 7" />
      </svg>
    ),
  },
]

const inputClass =
  'w-full rounded-lg border border-neon-cyan/20 bg-night-800/60 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-neon-cyan/70 focus:shadow-[0_0_18px_rgba(0,212,255,0.2)]'

const safeTrim = (value = '') => value.replace(/\s+/g, ' ').trim()

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [mailto, setMailto] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const buildMailto = (payload) => {
    const params = new URLSearchParams({
      subject: `[Portfolio] ${payload.subject}`,
      body: `Nome: ${payload.name}\nE-mail: ${payload.email}\n\n${payload.message}`,
    })
    return `mailto:${site.email}?${params.toString()}`
  }

  const validate = (payload) => {
    if (payload.website) return 'error'
    if (payload.name.length < 2 || payload.name.length > 80) return 'error'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return 'error'
    if (payload.subject.length < 4 || payload.subject.length > 120) return 'error'
    if (payload.message.length < 10 || payload.message.length > 1200) return 'error'
    return 'ok'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    const payload = {
      name: safeTrim(form.name),
      email: safeTrim(form.email.toLowerCase()),
      subject: safeTrim(form.subject),
      message: safeTrim(form.message),
      website: safeTrim(form.website),
    }

    if (validate(payload) !== 'ok') {
      setStatus('error')
      return
    }

    const mailtoUrl = buildMailto(payload)
    setMailto(mailtoUrl)
    setStatus('success')
    window.location.href = mailtoUrl
  }

  return (
    <section id="contato" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center" data-reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-neon-purple uppercase">Contato</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Vamos <span className="text-gradient">construir uma solução?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Aberto para oportunidades em operação, logística e desenvolvimento de sistemas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2" data-reveal-left>
            <div className="glass neon-border rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-white">Canais rápidos</h3>
              <ul className="mt-6 space-y-3">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 rounded-xl border border-transparent px-4 py-3 transition-all duration-200 hover:border-neon-cyan/30 hover:bg-night-800/60 focus-visible:border-neon-cyan/50 focus-visible:outline-none"
                    >
                      <span className="text-slate-400 transition-all duration-200 group-hover:text-neon-cyan group-hover:glow-cyan">
                        {s.icon}
                      </span>
                      <span className="font-medium text-slate-200">{s.name}</span>
                      <span className="ml-auto text-slate-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-neon-cyan">
                        &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-night-700 pt-6">
                <div className="font-mono text-xs text-slate-500">localização</div>
                <div className="mt-1 text-sm font-medium text-slate-200">{site.location}</div>
                <div className="mt-3 font-mono text-xs text-slate-500">telefones</div>
                <div className="mt-1 text-sm font-medium text-slate-200">{site.phone.join(' · ')}</div>
                <div className="mt-3 font-mono text-xs text-slate-500">disponibilidade</div>
                <div className="mt-1 text-sm font-medium text-emerald-400">{site.availability}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3" data-reveal-right>
            <form onSubmit={handleSubmit} className="glass neon-border rounded-2xl p-6 sm:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    maxLength={80}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={120}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="voce@email.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Assunto
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  maxLength={120}
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Ex.: Otimização de operação e estoque"
                  className={inputClass}
                />
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={1200}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Conte sua necessidade, objetivo e prazo..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Não preencha este campo</label>
                <input
                  id="website"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group mt-6 w-full overflow-hidden rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3.5 font-semibold text-night-950 transition-all duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-neon-cyan disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending'
                  ? 'Validando...'
                  : status === 'success'
                    ? 'Mensagem pronta no e-mail!'
                    : status === 'error'
                      ? 'Dados inválidos — revise e tente de novo'
                      : 'Enviar mensagem'}
              </button>

              <div aria-live="polite">
                {status === 'success' && (
                  <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                    Seu aplicativo de e-mail foi aberto com a mensagem pronta. Se necessário, use o botão abaixo.
                    {mailto && (
                      <a
                        href={mailto}
                        className="mt-3 inline-block rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-5 py-2.5 font-semibold text-neon-cyan transition-all duration-200 hover:bg-neon-cyan/20"
                      >
                        Abrir e-mail novamente
                      </a>
                    )}
                  </div>
                )}
                {status === 'error' && (
                  <div className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                    Verifique nome, e-mail, assunto e mensagem. Evite caracteres inválidos e campos vazios.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
