import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './hooks/useInView.js'

import CustomCursor from './components/CustomCursor.jsx'
import ParticleBackground from './components/ParticleBackground.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import BackToTop from './components/BackToTop.jsx'
import ClickBurst from './components/ClickBurst.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Portfolio from './components/Portfolio.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import FAQ from './components/FAQ.jsx'
import Differentials from './components/Differentials.jsx'
import SystemSection from './components/SystemSection.jsx'
import Timeline from './components/Timeline.jsx'
import Testimonials from './components/Testimonials.jsx'
import LikeCTA from './components/LikeCTA.jsx'
import CodeDivider from './components/CodeDivider.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      gsap.utils.toArray('[data-reveal-left]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: -64, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })

      gsap.utils.toArray('[data-reveal-right]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: 64, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })

      gsap.utils.toArray('[data-reveal-scale]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })

      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll('[data-reveal-child]'),
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: 'top 82%' },
          },
        )
      })

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.2')
        gsap.fromTo(
          el,
          { yPercent: -20 * speed },
          {
            yPercent: 20 * speed,
            ease: 'none',
            scrollTrigger: { trigger: el, scrub: true, start: 'top bottom', end: 'bottom top' },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-lg focus:bg-gradient-to-r focus:from-neon-cyan focus:to-neon-purple focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-night-950"
      >
        Pular para o conteúdo
      </a>

      <ScrollProgress />
      <ClickBurst />
      <div className="scanlines" aria-hidden="true" />
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main id="conteudo" className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <CodeDivider label="módulo: projetos" />
        <Portfolio />
        <CodeDivider label="módulo: orçamento" />
        <Services />
        <Process />
        <FAQ />
        <Differentials />
        <SystemSection />
        <Timeline />
        <Testimonials />
        <CodeDivider label="módulo: feedback" />
        <LikeCTA />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
