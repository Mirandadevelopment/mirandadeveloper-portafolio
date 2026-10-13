import { useEffect, useState } from 'react'
import { useInView, prefersReducedMotion } from '../hooks/useInView.js'
import GlitchText from './GlitchText.jsx'
import Magnetic from './Magnetic.jsx'
import { site } from '../config/site.js'

const phrases = [
  'Analista de Sistemas de Operação',
  'Desenvolvedor Full Stack',
  'Automação com Node.js, Python e C++',
  'Especialista em Controle de Materiais e Logística',
]

const stats = [
  { value: 9, suffix: '+', label: 'Anos em operações e infraestrutura' },
  { value: 2, suffix: '+', label: 'Anos em desenvolvimento freelancer' },
  { value: 3, suffix: '', label: 'Frentes: logística, estoque e automação' },
]

function Counter({ value, suffix }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) {
      setCurrent(value)
      return
    }
    const duration = 1200
    const start = performance.now()
    let raf = null
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setCurrent(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-2xl font-bold text-gradient sm:text-3xl">
      {current}
      {suffix}
    </span>
  )
}

export default function Hero() {
  const [text, setText] = useState('')
  const [current, setCurrent] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setText(phrases[0])
      return undefined
    }
    const phrase = phrases[current]
    const speed = deleting ? 40 : 85

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = phrase.slice(0, text.length + 1)
        setText(next)
        if (next === phrase) {
          setTimeout(() => setDeleting(true), 1600)
        }
      } else {
        const next = phrase.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setCurrent((c) => (c + 1) % phrases.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [text, deleting, current])

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-20"
    >
      <div className="bg-aurora absolute inset-0 -z-10" />
      <div className="profile-stage absolute top-24 left-1/2 z-0 -translate-x-1/2 md:top-28" aria-label={`Foto de perfil de ${site.profileName}`}>
        <div className="profile-halo" aria-hidden="true" />
        <div className="profile-avatar-wrap">
          <img
            src={site.avatar}
            alt={site.profileName}
            className="profile-avatar"
            width="144"
            height="144"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="profile-label">@{site.profileName}</span>
      </div>
      <div className="grid-overlay absolute inset-0 -z-10" />
      <div className="absolute top-1/4 left-10 h-64 w-64 -z-10 bg-neon-cyan/10 blur-3xl" />
      <div className="absolute right-10 bottom-1/4 h-64 w-64 -z-10 bg-neon-purple/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-44 text-center md:pt-48">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span data-floaty className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest text-neon-cyan uppercase">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-cyan glow-cyan" />
            Disponível para oportunidades
          </span>
          <span data-floaty className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest text-neon-purple uppercase">
            <span className="h-2 w-2 rounded-full bg-neon-purple glow-purple" />
            Operação, logística e desenvolvimento
          </span>
        </div>

        <h1 className="font-display mt-8 text-4xl leading-tight font-extrabold text-white sm:text-6xl md:text-7xl">
          <GlitchText text="Allan Miranda da Rosa" />
          <span className="mt-2 block text-xl font-bold sm:text-2xl md:text-3xl">
            <span className="text-gradient text-glow">Analista de Sistemas de Operação | Desenvolvedor Full Stack</span>
          </span>
        </h1>

        <p
          className={`mt-8 h-8 text-lg font-medium text-slate-200 sm:text-2xl ${
            prefersReducedMotion() ? '' : 'typing-caret'
          }`}
          aria-label={`Cargos: ${phrases.join(', ')}`}
        >
          {text}
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
          Profissional versátil com atuação em Análise de Sistemas de Operação, desenvolvimento de software,
          controle de materiais, compras técnicas e gestão de estoque, com entregas para contextos de alta exigência
          como Petrobras e Sodexo.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#projetos"
              data-floaty className="group relative block overflow-hidden rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple px-8 py-3.5 font-semibold text-night-950 transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-night-950"
            >
              <span className="relative z-10">Ver Projetos</span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="Allan-Miranda-CV.html"
              download
              data-floaty className="neon-border group block rounded-lg px-8 py-3.5 font-semibold text-neon-cyan transition-all duration-200 hover:scale-105 hover:bg-neon-cyan/10 focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              Baixar CV
            </a>
          </Magnetic>
        </div>

        <div data-reveal-group className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} data-reveal-child data-floaty className="glass neon-border rounded-xl px-3 py-5">
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para a seção Sobre"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-neon-cyan/70 transition-colors hover:text-neon-cyan md:block"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  )
}
