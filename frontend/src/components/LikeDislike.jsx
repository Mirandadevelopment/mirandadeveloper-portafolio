import { useEffect, useState } from 'react'
import { site } from '../config/site.js'

const PREFIX = 'am-vote-'
const supabase = site.supabase

function HeartIcon({ active, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.5-4.35-9.33-8.2C1.1 10.7 1.3 7.5 3.6 5.8 5.5 4.4 8 4.7 9.6 6.4L12 9l2.4-2.6c1.6-1.7 4.1-2 6-0.6 2.3 1.7 2.5 4.9.93 7S12 21 12 21z"
      />
    </svg>
  )
}

function DislikeIcon({ active, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 15V19a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"
      />
      <path
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 2h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2"
      />
    </svg>
  )
}

export default function LikeDislike({ id, initialLikes = 0, initialDislikes = 0, size = 'sm' }) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [vote, setVote] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [pop, setPop] = useState(null)

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
    setPop(type)
    setTimeout(() => setPop(null), 350)

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

  const isLg = size === 'lg'
  const iconCls = isLg ? 'h-6 w-6' : 'h-5 w-5'

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <div className={`inline-flex items-center ${isLg ? 'gap-3' : 'gap-2'}`}>
        <button
          type="button"
          onClick={() => toggle('like')}
          disabled={busy}
          aria-pressed={vote === 'like'}
          aria-label={`Curtir (${likes})`}
          className={`group inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-pink-400 disabled:cursor-wait disabled:opacity-60 ${
            isLg ? 'px-5 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'
          } ${
            vote === 'like'
              ? 'bg-pink-500/20 text-pink-400 shadow-[0_0_16px_rgba(236,72,153,0.35)]'
              : 'text-slate-400 hover:bg-white/5 hover:text-pink-300'
          }`}
        >
          <span className={`inline-flex transition-transform duration-200 ${pop === 'like' ? 'scale-125' : 'group-hover:scale-110'}`}>
            <HeartIcon active={vote === 'like'} className={iconCls} />
          </span>
          <span className="font-mono tabular-nums">{likes}</span>
          {isLg && <span className="hidden sm:inline">{vote === 'like' ? 'Curtiu' : 'Curtir'}</span>}
        </button>

        <button
          type="button"
          onClick={() => toggle('dislike')}
          disabled={busy}
          aria-pressed={vote === 'dislike'}
          aria-label={`Não curtir (${dislikes})`}
          className={`group inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-wait disabled:opacity-60 ${
            isLg ? 'px-5 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'
          } ${
            vote === 'dislike'
              ? 'bg-slate-500/20 text-slate-300'
              : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
          }`}
        >
          <span className={`inline-flex transition-transform duration-200 ${pop === 'dislike' ? 'scale-125' : 'group-hover:scale-110'}`}>
            <DislikeIcon active={vote === 'dislike'} className={iconCls} />
          </span>
          <span className="font-mono tabular-nums">{dislikes}</span>
          {isLg && <span className="hidden sm:inline">{vote === 'dislike' ? 'Não curtiu' : 'Não curtir'}</span>}
        </button>
      </div>
      {error && <span className="text-[11px] text-amber-300/90">{error}</span>}
    </div>
  )
}
