import { useEffect, useState } from 'react'
import { site } from '../config/site.js'

const PREFIX = 'am-vote-'
const supabase = site.supabase

export default function LikeDislike({ id, initialLikes = 0, initialDislikes = 0, size = 'sm' }) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [vote, setVote] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    try {
      const raw = localStorage.getItem(PREFIX + id)
      if (raw) {
        const data = JSON.parse(raw)
        if (!cancelled) setVote(data.vote || null)
      }
    } catch {
      /* localStorage indisponível */
    }

    const loadGlobalVotes = async () => {
      try {
        const response = await fetch(
          `${supabase.url}/rest/v1/portfolio_votes?id=eq.${encodeURIComponent(id)}&select=likes,dislikes`,
          {
            headers: {
              apikey: supabase.anonKey,
              Authorization: `Bearer ${supabase.anonKey}`,
            },
          },
        )

        if (!response.ok) throw new Error('Não foi possível carregar as curtidas')
        const rows = await response.json()
        const row = rows[0]
        if (!cancelled && row) {
          setLikes(Number(row.likes) || 0)
          setDislikes(Number(row.dislikes) || 0)
        }
      } catch {
        if (!cancelled) setError('Não foi possível carregar a contagem agora.')
      }
    }

    loadGlobalVotes()
    return () => {
      cancelled = true
    }
  }, [id])

  const persistVote = (nextVote) => {
    try {
      localStorage.setItem(PREFIX + id, JSON.stringify({ vote: nextVote }))
    } catch {
      /* ignore */
    }
  }

  const toggle = async (type) => {
    if (busy) return

    const nextVote = vote === type ? null : type
    setBusy(true)
    setError('')

    try {
      const response = await fetch(`${supabase.url}/rest/v1/rpc/change_portfolio_vote`, {
        method: 'POST',
        headers: {
          apikey: supabase.anonKey,
          Authorization: `Bearer ${supabase.anonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          p_vote_id: id,
          p_previous_vote: vote,
          p_next_vote: nextVote,
        }),
      })

      if (!response.ok) throw new Error('Não foi possível salvar a curtida')
      const result = await response.json()
      const row = Array.isArray(result) ? result[0] : result
      if (!row) throw new Error('Resposta inválida')

      setLikes(Number(row.likes) || 0)
      setDislikes(Number(row.dislikes) || 0)
      setVote(nextVote)
      persistVote(nextVote)
    } catch {
      setError('Não foi possível salvar agora. Tente novamente em instantes.')
    } finally {
      setBusy(false)
    }
  }

  const base =
    size === 'lg'
      ? 'gap-2 px-5 py-2.5 text-sm'
      : 'gap-1.5 px-3 py-1.5 text-xs'

  const buildBtn = ({ type, active, onClick, count, label, d }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      aria-pressed={active}
      aria-label={`${label} (${count})`}
      className={`group inline-flex items-center rounded-full font-semibold transition-all duration-200 active:scale-90 focus-visible:ring-2 focus-visible:ring-neon-cyan disabled:cursor-wait disabled:opacity-60 ${base} ${
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
    <div className="inline-flex flex-col items-start gap-1">
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
          label: 'Não curtir',
          d: 'M17 14V3M21.5 14a2 2 0 0 1-2 2H16c-1.7 0-3 1.3-3 3v1a2 2 0 0 1-4 0v-4H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1M17 3h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2',
        })}
      </div>
      {error && <span className="text-[11px] text-amber-300/90">{error}</span>}
    </div>
  )
}
