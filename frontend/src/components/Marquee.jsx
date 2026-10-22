const techs = [
  'Lua',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'React',
  'FiveM',
  'discord.js',
  'Python',
  'SQL',
  'MySQL',
  'SQL Server',
  'REST APIs',
  'Git',
  'Virtualização',
  'Windows Server',
  'Otimização FiveM',
]

export default function Marquee({ items = techs }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-night-800 bg-night-900/50 py-5" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#05050f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#05050f] to-transparent" />
      <div className="marquee-track flex w-max items-center gap-10">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-10 text-sm font-bold tracking-[0.25em] text-slate-500 uppercase"
          >
            {item}
            <span className="text-neon-cyan/40">//</span>
          </span>
        ))}
      </div>
    </div>
  )
}
