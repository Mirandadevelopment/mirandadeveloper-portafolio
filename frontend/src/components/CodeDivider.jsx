export default function CodeDivider({ label }) {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-2" aria-hidden="true">
      <span className="font-mono text-[10px] tracking-widest text-slate-600">// {label}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-neon-cyan/30 via-night-700 to-transparent" />
      <span className="typing-caret text-neon-cyan/70" />
    </div>
  )
}
