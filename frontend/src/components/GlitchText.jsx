export default function GlitchText({ text, className = '' }) {
  return (
    <span className={`glitch inline-block ${className}`} data-text={text}>
      <span className="relative z-10">{text}</span>
    </span>
  )
}
