import { useEffect, useState } from 'react'
import { useInView, prefersReducedMotion } from '../hooks/useInView.js'
import GlitchText from './GlitchText.jsx'
import Magnetic from './Magnetic.jsx'
import { site } from '../config/site.js'
import { recordPortfolioEvent } from '../lib/supabase.js'

const phrases = [
  'Desenvolvedor Full Stack',
  'Analista de Sistemas de Operação',
  'Especialista FiveM · Lua/JS',
  'Automação & Logística',
]

const stats = [
  { value: 4, suffix: '+', label: 'Anos de código' },
  { value: 50, suffix: '+', label: 'Scripts FiveM' },
  { value: 8, suffix: '+', label: 'Anos em operações' },
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
      className="hero-section relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="hero-atmosphere absolute inset-0 -z-10" />
      <div className="grid-overlay absolute inset-0 -z-10" />
      <div className="hero-shell relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="hero-topline">
          <span><span className="hero-status-dot" /> MIRANDA.DEV <span className="hero-topline-muted">/ INTERFACE 01</span></span>
          <span className="hero-location">MAGÉ, RJ <span>—</span> BRASIL</span>
          <span className="hero-availability"><span /> DISPONÍVEL PARA PROJETOS</span>
        </div>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-kicker">Engenharia digital <span>—</span> do conceito ao código</p>
            <h1 className="hero-name">
              <span className="sr-only">Allan </span>
              <GlitchText text="Allan" />
              <span>Miranda<span className="hero-name-period">.</span></span>
            </h1>
            <p className="hero-role"><span className="text-gradient">Full Stack</span> <span>/</span> Sistemas <span>/</span> FiveM</p>
            <p
              className={`hero-type ${prefersReducedMotion() ? '' : 'typing-caret'}`}
              aria-label={`Cargos: ${phrases.join(', ')}`}
            >
              {text}
            </p>
            <p className="hero-intro">
              Transformo processos complexos em sistemas simples, rápidos e feitos para o mundo real.
              Desenvolvimento, automação e tecnologia com propósito.
            </p>

            <div className="hero-actions">
              <Magnetic>
                <a href="#servicos" className="hero-primary-action">
                  Vamos construir <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.cvUrl}
                  download
                  onClick={() => recordPortfolioEvent({ event: 'cv_download' }).catch(() => {})}
                  className="hero-secondary-action"
                >
                  Explorar currículo <span aria-hidden="true">↓</span>
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="hero-visual" aria-label={`Foto de perfil de ${site.profileName}`}>
            <div className="hero-visual-orbit hero-visual-orbit-outer" aria-hidden="true" />
            <div className="hero-visual-orbit hero-visual-orbit-inner" aria-hidden="true" />
            <div className="hero-visual-crosshair hero-visual-crosshair-top" aria-hidden="true" />
            <div className="hero-visual-crosshair hero-visual-crosshair-bottom" aria-hidden="true" />
            <div className="hero-visual-glow" aria-hidden="true" />
            <div className="hero-portrait-frame">
              <img
                src={site.avatar}
                alt={site.profileName}
                width="512"
                height="512"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="hero-visual-index">FIG. 01 <span>—</span> HUMAN / MACHINE</span>
            <div className="hero-code-chip" aria-hidden="true">
              <span className="hero-code-dot" />
              <span>const <b>future</b> = await build();</span>
            </div>
            <div className="hero-stack-chip" aria-hidden="true">
              <span>STACK / 2026</span>
              <b>JS&nbsp; · &nbsp;LUA&nbsp; · &nbsp;PY</b>
            </div>
          </div>

          <div className="hero-aside">
            <span className="hero-aside-index">01 — 03</span>
            <span className="hero-aside-line" />
            <p>Ideias que<br />funcionam <span>além da tela.</span></p>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
              Conectar <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-bottomline">
          <div data-reveal-group className="hero-stats">
            {stats.map((s, index) => (
              <div key={s.label} data-reveal-child className="hero-stat">
                <span className="hero-stat-index">0{index + 1}</span>
                <Counter value={s.value} suffix={s.suffix} />
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <a href="#sobre" className="hero-scroll">
            <span>SCROLL PARA EXPLORAR</span>
            <span className="hero-scroll-icon" aria-hidden="true">↓</span>
          </a>
          <span className="hero-edition">PORTFÓLIO DIGITAL <span>© 2026</span></span>
        </div>
      </div>
    </section>
  )
}
