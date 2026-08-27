export default function SectionHeading({ eyebrow, eyebrowClass, title, description }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <span
        className={`text-xs font-semibold tracking-[0.3em] uppercase ${
          eyebrowClass || 'text-neon-purple'
        }`}
      >
        {eyebrow}
      </span>
      <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base text-slate-400">{description}</p>}
    </div>
  )
}
