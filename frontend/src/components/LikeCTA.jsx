import LikeDislike from './LikeDislike.jsx'
import Magnetic from './Magnetic.jsx'
import CodeRain from './CodeRain.jsx'

export default function LikeCTA() {
  return (
    <section id="curtir" className="relative overflow-hidden py-24">
      <CodeRain opacity="30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05050f] via-transparent to-[#05050f]" />
      <div data-reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-slate-500 uppercase">
          &gt; feedback_module
        </span>
        <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-5xl">
          Gostou do que <span className="text-gradient">viu?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Cada curtida conta como uma validacao de missao. Deixe sua marca e ajude a calibrar este sistema.
        </p>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="glass neon-border rounded-2xl px-8 py-6">
            <LikeDislike id="global" size="lg" />
          </div>

          <Magnetic>
            <a
              href="#contato"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple px-8 py-3.5 font-semibold text-night-950 transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              <span className="relative z-10">Vamos trabalhar juntos</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
