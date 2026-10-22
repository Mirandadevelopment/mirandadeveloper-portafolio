import { useEffect, useState } from 'react'
import {
  signUp,
  signIn,
  fetchApprovedComments,
  submitComment,
  saveSession,
  loadSession,
  clearSession,
} from '../lib/supabase.js'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export default function Feedback() {
  const [session, setSession] = useState(null)
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(true)
  const [mode, setMode] = useState('comment') // comment | login | register
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    content: '',
  })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    const s = loadSession()
    if (s?.access_token) setSession(s)
    loadComments()
  }, [])

  const loadComments = async () => {
    setLoadingComments(true)
    try {
      const rows = await fetchApprovedComments()
      setComments(Array.isArray(rows) ? rows : [])
    } catch {
      setComments([])
    } finally {
      setLoadingComments(false)
    }
  }

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleRegister = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMessage({ type: '', text: '' })
    try {
      const username = form.username.trim().toLowerCase()
      if (username.length < 3) throw new Error('Usuário precisa ter pelo menos 3 caracteres.')
      if (form.password.length < 6) throw new Error('Senha precisa ter pelo menos 6 caracteres.')

      const data = await signUp({
        name: form.name,
        username,
        password: form.password,
      })

      // Alguns projetos exigem confirmação de e-mail; tentamos logar em seguida
      let next = data
      if (!data.access_token) {
        next = await signIn({ username, password: form.password })
      }

      const sess = {
        access_token: next.access_token,
        user: next.user,
        username,
        name: form.name.trim() || username,
      }
      saveSession(sess)
      setSession(sess)
      setMode('comment')
      setMessage({ type: 'ok', text: 'Conta criada! Agora você pode deixar seu feedback.' })
      setForm((f) => ({ ...f, password: '' }))
    } catch (err) {
      setMessage({ type: 'err', text: err.message || 'Erro ao criar conta.' })
    } finally {
      setBusy(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMessage({ type: '', text: '' })
    try {
      const username = form.username.trim().toLowerCase()
      const data = await signIn({ username, password: form.password })
      const meta = data.user?.user_metadata || {}
      const sess = {
        access_token: data.access_token,
        user: data.user,
        username: meta.username || username,
        name: meta.full_name || username,
      }
      saveSession(sess)
      setSession(sess)
      setMode('comment')
      setMessage({ type: 'ok', text: 'Login feito com sucesso.' })
      setForm((f) => ({ ...f, password: '' }))
    } catch (err) {
      setMessage({ type: 'err', text: err.message || 'Erro ao entrar.' })
    } finally {
      setBusy(false)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!session?.access_token) {
      setMode('login')
      setMessage({ type: 'err', text: 'Entre na sua conta para comentar.' })
      return
    }
    setBusy(true)
    setMessage({ type: '', text: '' })
    try {
      if (form.content.trim().length < 5) {
        throw new Error('Escreva pelo menos algumas palavras no feedback.')
      }
      await submitComment({
        accessToken: session.access_token,
        authorName: session.name,
        username: session.username,
        content: form.content,
      })
      setForm((f) => ({ ...f, content: '' }))
      setMessage({
        type: 'ok',
        text: 'Feedback enviado! Ele fica visível no site depois que eu aprovar.',
      })
    } catch (err) {
      setMessage({
        type: 'err',
        text: err.message || 'Erro ao enviar. Confira se a tabela de comentários está configurada no Supabase.',
      })
    } finally {
      setBusy(false)
    }
  }

  const logout = () => {
    clearSession()
    setSession(null)
    setMessage({ type: 'ok', text: 'Você saiu da conta.' })
  }

  const inputClass =
    'w-full rounded-lg border border-neon-cyan/20 bg-night-800/60 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-neon-cyan/70'

  return (
    <section id="feedback" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070d14] via-transparent to-[#070d14]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center" data-reveal>
          <span className="font-mono text-xs tracking-[0.3em] text-slate-500 uppercase">
            &gt; feedback
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-5xl">
            Deixe seu <span className="text-gradient">feedback</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Comentários de clientes e futuros clientes. Você cria uma conta simples, envia o texto e eu
            aprovo antes de aparecer aqui.
          </p>
        </div>

        <div className="glass neon-border rounded-2xl p-6 sm:p-8" data-reveal>
          {session ? (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-slate-300">
                Logado como <strong className="text-neon-cyan">@{session.username}</strong>
              </p>
              <button
                type="button"
                onClick={logout}
                className="text-slate-400 underline-offset-2 hover:text-white hover:underline"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="mb-5 flex flex-wrap gap-2 text-sm">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  mode === 'login' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-slate-400 hover:text-white'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  mode === 'register' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-slate-400 hover:text-white'
                }`}
              >
                Criar conta
              </button>
            </div>
          )}

          {message.text && (
            <div
              className={`mb-4 rounded-lg px-4 py-3 text-sm ${
                message.type === 'ok'
                  ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                  : 'border border-amber-400/30 bg-amber-400/10 text-amber-200'
              }`}
            >
              {message.text}
            </div>
          )}

          {!session && mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nome
                </label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  placeholder="Seu nome"
                  className={inputClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Usuário (único)
                </label>
                <input
                  name="username"
                  required
                  value={form.username}
                  onChange={onChange}
                  placeholder="ex: joao_dev"
                  className={inputClass}
                  autoComplete="username"
                  pattern="[A-Za-z0-9._-]{3,24}"
                  title="3 a 24 caracteres: letras, números, . _ -"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Senha
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={onChange}
                  placeholder="Mínimo 6 caracteres"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-semibold text-night-950 transition hover:scale-[1.01] disabled:opacity-60"
              >
                {busy ? 'Criando…' : 'Criar conta'}
              </button>
              <p className="text-center text-[11px] text-slate-500">
                A senha é criptografada pelo Supabase. Não guardamos senha em texto puro.
              </p>
            </form>
          )}

          {!session && mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Usuário
                </label>
                <input
                  name="username"
                  required
                  value={form.username}
                  onChange={onChange}
                  placeholder="seu_usuario"
                  className={inputClass}
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Senha
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={onChange}
                  placeholder="Sua senha"
                  className={inputClass}
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-semibold text-night-950 transition hover:scale-[1.01] disabled:opacity-60"
              >
                {busy ? 'Entrando…' : 'Entrar'}
              </button>
            </form>
          )}

          {session && (
            <form onSubmit={handleComment} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Seu comentário
                </label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  value={form.content}
                  onChange={onChange}
                  placeholder="Conte como foi trabalhar comigo ou o que espera do projeto…"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-semibold text-night-950 transition hover:scale-[1.01] disabled:opacity-60"
              >
                {busy ? 'Enviando…' : 'Enviar feedback'}
              </button>
              <p className="text-center text-[11px] text-slate-500">
                Seu comentário só aparece no site depois da minha aprovação.
              </p>
            </form>
          )}

          {!session && mode === 'comment' && (
            <p className="text-center text-sm text-slate-400">
              Para comentar,{' '}
              <button type="button" className="text-neon-cyan underline" onClick={() => setMode('register')}>
                crie uma conta
              </button>{' '}
              ou{' '}
              <button type="button" className="text-neon-cyan underline" onClick={() => setMode('login')}>
                entre
              </button>
              .
            </p>
          )}
        </div>

        <div className="mt-12" data-reveal>
          <h3 className="font-display mb-6 text-center text-lg font-bold text-white">
            Feedbacks aprovados
          </h3>
          {loadingComments && (
            <p className="text-center text-sm text-slate-500">Carregando…</p>
          )}
          {!loadingComments && comments.length === 0 && (
            <p className="text-center text-sm text-slate-500">
              Ainda não há comentários públicos. Seja o primeiro a enviar um feedback.
            </p>
          )}
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="glass neon-border rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">
                    {c.author_name}{' '}
                    <span className="font-mono text-xs font-normal text-neon-cyan">@{c.username}</span>
                  </p>
                  <span className="text-xs text-slate-500">{formatDate(c.created_at)}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
