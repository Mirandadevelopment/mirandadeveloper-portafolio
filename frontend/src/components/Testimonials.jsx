import SectionHeading from './SectionHeading.jsx'

const testimonials = [
  {
    quote:
      'Redução drástica do consumo de ms/tick e estabilidade total no pico de jogadores. Entrega rápida e comunicação impecável.',
    role: 'Gestor de Base FiveM',
    accent: 'text-neon-cyan',
  },
  {
    quote:
      'O bot transformou a comunidade: verificação automática, tickets e moderação eficiente. Suporte próximo e profissional.',
    role: 'Fundador de Comunidade Discord',
    accent: 'text-neon-purple',
  },
  {
    quote:
      'Sistema de gestão entregue no prazo, documentado e com integrações funcionando de ponta a ponta. Muita disciplina no processo.',
    role: 'Cliente · Automação & Gestão',
    accent: 'text-neon-blue',
  },
]

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal>
          <SectionHeading
            eyebrow="Depoimentos"
            eyebrowClass="text-neon-purple"
            title={
              <>
                Quem trabalhou comigo <span className="text-gradient">recomenda</span>
              </>
            }
            description="Feedback de quem viu disciplina e performance em ação."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3" data-reveal-group>
          {testimonials.map((t) => (
            <figure
              key={t.role}
              data-reveal-child
              data-tilt
              className="glass neon-border group flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-8 w-8 opacity-40 ${t.accent}`}
                aria-hidden="true"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v6h6v-6H6.5C6.5 10.9 8 9.5 10 9V8zm10 0c-3.3 0-6 2.7-6 6v6h6v-6h-3.5c0-2.1 1.5-3.5 3.5-4V8z" />
              </svg>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-night-700 pt-4">
                <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-xs font-bold text-night-950">
                  {t.role.charAt(0)}
                </span>
                <span className="text-sm font-medium text-slate-200">{t.role}</span>
                <span className="ml-auto flex gap-0.5" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" className={`h-3.5 w-3.5 ${t.accent}`} aria-hidden="true">
                      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2l-5-4.9 6.9-1L12 2z" />
                    </svg>
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
