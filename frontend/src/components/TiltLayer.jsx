import { useEffect } from 'react'
import { prefersReducedMotion } from '../hooks/useInView.js'

export default function TiltLayer() {
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse || prefersReducedMotion()) return undefined

    const strength = 10
    const onMove = (e) => {
      document.querySelectorAll('[data-tilt]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const rotateY = ((x - cx) / cx) * strength
        const rotateX = -((y - cy) / cy) * strength
        el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
      })
    }

    const onLeave = () => {
      document.querySelectorAll('[data-tilt]').forEach((el) => {
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
      })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return null
}
