import { useEffect, useState } from 'react'
import { fetchAllComments, setCommentApproved, deleteComment } from '../lib/supabase.js'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

export default function AdminModeration({ session }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('pending') // pending | approved | all

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAllComments(session.access_token)
      setRows(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Erro ao carregar moderação. Rode o SQL de admin no Supabase.')
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [session.access_token])

  const filtered = rows.filter((r) => {
    if (filter === 'pending') return !r.approved
    if (filter === 'approved') return r.approved
    return true
  })

  const approve = async (id) => {
    setBusyId(id)
    setError('')
    try {
      await setCommentApproved({ accessToken: session.access_token, id, approved: true })
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)))
    } catch (err) {
      setError(err.message || 'Falha ao aprovar.')
    } finally {
      setBusyId(null)
    }
  }

  const unpublish = async (id) => {
    setBusyId(id)
    setError('')
    try {
      await setCommentApproved({ accessToken: session.access_token, id, approved: false })
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, approved: false } : r)))
    } catch (err) {
      setError(err.message || 'Falha ao despublicar.')
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Excluir este comentário permanentemente?')) return
    setBusyId(id)
    setError('')
    try {
      await deleteComment({ accessToken: session.access_token, id })
      setRows((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      setError(err.message || 'Falha ao excluir.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-amber-200">Painel admin</h3>
          <p className="text-xs text-slate-400">Aprove, despublique ou exclua comentários</p>
        </div>
        <button
          type="button"
          onClick={load}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5"
        >
          Atualizar lista
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        {[
          { id: 'pending', label: 'Pendentes' },
          { id: 'approved', label: 'Aprovados' },
          { id: 'all', label: 'Todos' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3 py-1 font-semibold transition ${
              filter === f.id
                ? 'bg-amber-400/20 text-amber-200'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm text-amber-100">
          {error}
        </div>
      )}

      {loading && <p className="text-sm text-slate-500">Carregando…</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-sm text-slate-500">Nenhum comentário neste filtro.</p>
      )}

      <ul className="space-y-3">
        {filtered.map((c) => (
          <li
            key={c.id}
            className="rounded-xl border border-white/10 bg-night-900/50 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-white">
                  {c.author_name}{' '}
                  <span className="font-mono text-xs font-normal text-neon-cyan">@{c.username}</span>
                </p>
                <p className="text-[11px] text-slate-500">{formatDate(c.created_at)}</p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                  c.approved
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : 'bg-amber-400/15 text-amber-200'
                }`}
              >
                {c.approved ? 'Público' : 'Pendente'}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.content}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {!c.approved && (
                <button
                  type="button"
                  disabled={busyId === c.id}
                  onClick={() => approve(c.id)}
                  className="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-50"
                >
                  Aprovar
                </button>
              )}
              {c.approved && (
                <button
                  type="button"
                  disabled={busyId === c.id}
                  onClick={() => unpublish(c.id)}
                  className="rounded-lg bg-slate-500/20 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-500/30 disabled:opacity-50"
                >
                  Despublicar
                </button>
              )}
              <button
                type="button"
                disabled={busyId === c.id}
                onClick={() => remove(c.id)}
                className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/25 disabled:opacity-50"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
