import { useEffect, useState } from 'react'

const PREFIX = 'am-like-'

export default function LikeDislike({ id, initialLikes = 0, initialDislikes = 0, size = 'sm' }) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [vote, setVote] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFIX + id)
      if (raw) {
        const data = JSON.parse(raw)
        setLikes(Number(data.likes) || initialLikes)
        setDislikes(Number(data.dislikes) || initialDislikes)
        setVote(data.vote || null)
      }
    } catch {
      /* localStorage indisponivel */
    }
  }, [id, initialLikes, initialDislikes])

  const persist = (next) => {
    try {
      localStorage.setItem(PREFIX + id, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  const toggle = (type) => {
    let nextVote = vote === type ? null : type
    let nextLikes = likes
    let nextDislikes = dislikes

    if (type === 'like') {
      if (vote === 'like') nextLikes -= 1
      else if (vote === 'dislike') {
        nextDislikes -= 1
        nextLikes += 1
      } else nextLikes += 1
    } else {
      if (vote === 'dislike') nextDislikes -= 1
      else if (vote === 'like') {
        nextLikes -= 1
        nextDislikes += 1
      } else nextDislikes += 1
    }

    setVote(nextVote)
    setLikes(nextLikes)
    setDislikes(nextDislikes)
    persist({ likes: nextLikes, dislikes: nextDislikes, vote: nextVote })
  }

  const base =
    size === 'lg'
      ? 'gap-2 px-5 py-2.5 text-sm'
      : 'gap-1.5 px-3 py-1.5 text-xs'

  const buildBtn = ({ type, active, onClick, count, label, d }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${label} (${count})`}
      className={`group inline-flex items-center rounded-full font-semibold transition-all duration-200 active:scale-90 focus-visible:ring-2 focus-visible:ring-neon-cyan ${base} ${
        active
          ? type === 'like'
            ? 'bg-neon-cyan/15 text-neon-cyan glow-cyan'
            : 'bg-red-500/15 text-red-400'
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4 transition-transform duration-200 group-active:scale-125"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      </svg>
      <span className="font-mono">{count}</span>
    </button>
  )

  return (
    <div className="inline-flex items-center gap-2">
      {buildBtn({
        type: 'like',
        active: vote === 'like',
        onClick: () => toggle('like'),
        count: likes,
        label: 'Curtir',
        d: 'M7 10v11M2.5 10a2 2 0 0 1 2-2H8c1.7 0 3-1.3 3-3V4a2 2 0 0 1 4 0v4h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1M7 21H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2',
      })}
      {buildBtn({
        type: 'dislike',
        active: vote === 'dislike',
        onClick: () => toggle('dislike'),
        count: dislikes,
        label: 'Nao curtir',
        d: 'M17 14V3M21.5 14a2 2 0 0 1-2 2H16c-1.7 0-3 1.3-3 3v1a2 2 0 0 1-4 0v-4H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1M17 3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2',
      })}
    </div>
  )
}
