import { useEffect, useState } from 'react'
import {
  signUp,
  signIn,
  signInWithGoogle,
  parseOAuthHash,
  fetchUser,
  fetchApprovedComments,
  submitComment,
  saveSession,
  loadSession,
  clearSession,
  sessionFromAuth,
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

/** Senha com mínimo 8 caracteres, letra e número. */
function validatePassword(password) {
  if (password.length < 8) return 'A senha precisa ter pelo menos 8 caracteres.'
  if (!/[A-Za-z]/.test(password)) return 'A senha precisa ter pelo menos uma letra.'
  if (!/[0-9]/.test(password)) return 'A senha precisa ter pelo menos um número.'
  return null
}

function sanitizeComment(text) {
  return String(text || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .trim()
    .slice(0, 2000)
}

export default function Feedback() {
  const [session, setSession] = useState(null)
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(true)
  const [mode, setMode] = useState('comment')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    content: '',
  })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    const boot = async () => {
      const oauth = parseOAuthHash()
      if (oauth?.access_token) {
        try {
          const user = await fetchUser(oauth.access_token)
          const sess = sessionFromAuth({ ...oauth, user })
          saveSession(sess)
          setSession(sess)
          setMode('comment')
          setMessage({ type: 'ok', text: 'Login com Google concluído com segurança.' })
          window.history.replaceState(null, '', window.location.pathname + window.location.search)
        } catch {
          setMessage({ type: 'err', text: 'Não foi possível concluir o login com Google.' })
        }
      } else {
        const s = loadSession()
        if (s?.access_token) setSession(s)
      }
      loadComments()
    }
    boot()
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
      const pwdError = validatePassword(form.password)
      if (pwdError) throw new Error(pwdError)

      const data = await signUp({
        name: form.name.trim().slice(0, 80),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })

      if (data.access_token) {
        const sess = sessionFromAuth(data)
        saveSession(sess)
        setSession(sess)
        setMode('comment')
        setMessage({ type: 'ok', text: 'Conta criada. Você já pode enviar seu feedback.' })
      } else {
        setMessage({
          type: 'ok',
          text: 'Conta criada. Abra o e-mail de confirmação e, em seguida, faça login.',
        })
        setMode('login')
      }
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
      const data = await signIn({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
      const sess = sessionFromAuth(data)
      saveSession(sess)
      setSession(sess)
      setMode('comment')
      setMessage({ type: 'ok', text: 'Login realizado com sucesso.' })
      setForm((f) => ({ ...f, password: '' }))
    } catch (err) {
      setMessage({
        type: 'err',
        text: err.message || 'E-mail ou senha incorretos. Se acabou de se cadastrar, confirme o e-mail primeiro.',
      })
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
      const content = sanitizeComment(form.content)
      if (content.length < 5) {
        throw new Error('Escreva pelo menos algumas palavras no feedback.')
      }
      await submitComment({
        accessToken: session.access_token,
        authorName: String(session.name || 'Cliente').slice(0, 80),
        username: String(session.username || 'user').slice(0, 24),
        content,
      })
      setForm((f) => ({ ...f, content: '' }))
      setMessage({
        type: 'ok',
        text: 'Feedback enviado. Ele só fica público depois da aprovação.',
      })
    } catch (err) {
      setMessage({
        type: 'err',
        text: err.message || 'Erro ao enviar. Verifique a configuração no Supabase.',
      })
    } finally {
      setBusy(false)
    }
  }

  const logout = () => {
    clearSession()
    setSession(null)
    setMessage({ type: 'ok', text: 'Sessão encerrada.' })
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
            Acesso com Google ou e-mail verificado. Comentários passam por aprovação antes de
            aparecerem no site.
          </p>
        </div>

        <div className="glass neon-border rounded-2xl p-6 sm:p-8" data-reveal>
          {session ? (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-slate-300">
                Conectado como <strong className="text-neon-cyan">{session.name}</strong>
                {session.email && (
                  <span className="ml-2 text-xs text-slate-500">{session.email}</span>
                )}
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
            <div className="mb-5 space-y-3">
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"
                  />
                  <path
                    fill="#34A853"
                    d="M3.9 7.3l3.2 2.4C8 7.5 9.9 6.2 12 6.2c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 8.3 2.5 5.1 4.6 3.9 7.3z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M12 21.5c2.5 0 4.6-.8 6.1-2.2l-3-2.4c-.8.6-1.9 1-3.1 1-3.1 0-5.7-2.1-6.6-4.9l-3.2 2.5c1.5 3 4.6 5 8.8 5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.4 13c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9L2.2 6.8C1.6 8.3 1.3 10 1.3 11.8c0 1.8.3 3.5.9 5l3.2-2.5c-.2-.5-.3-1-.3-1.3z"
                  />
                </svg>
                Continuar com Google
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="h-px flex-1 bg-white/10" />
                ou e-mail verificado
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
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
            </div>
          )}

          {message.text && (
            <div
              role="status"
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
            <form onSubmit={handleRegister} className="space-y-4" autoComplete="on">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nome
                </label>
                <input
                  name="name"
                  required
                  maxLength={80}
                  value={form.name}
                  onChange={onChange}
                  placeholder="Seu nome"
                  className={inputClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  E-mail
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  placeholder="voce@email.com"
                  className={inputClass}
                  autoComplete="email"
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
                  minLength={8}
                  value={form.password}
                  onChange={onChange}
                  placeholder="Mínimo 8 caracteres, com letra e número"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-semibold text-night-950 transition hover:scale-[1.01] disabled:opacity-60"
              >
                {busy ? 'Criando…' : 'Criar conta com e-mail'}
              </button>
              <ul className="space-y-1 text-center text-[11px] text-slate-500">
                <li>Confirmação por e-mail obrigatória</li>
                <li>Senha armazenada com criptografia (Supabase Auth)</li>
                <li>Comentários só ficam públicos após aprovação</li>
              </ul>
            </form>
          )}

          {!session && mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  E-mail
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  placeholder="voce@email.com"
                  className={inputClass}
                  autoComplete="email"
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
                {busy ? 'Entrando…' : 'Entrar com e-mail'}
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
                  maxLength={2000}
                  value={form.content}
                  onChange={onChange}
                  placeholder="Conte como foi a experiência ou o que espera do projeto…"
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
                Moderação ativa: o texto só aparece no site depois da aprovação.
              </p>
            </form>
          )}

          {!session && mode === 'comment' && (
            <p className="text-center text-sm text-slate-400">
              Use <strong className="text-white">Google</strong> ou e-mail verificado para enviar um feedback.
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
